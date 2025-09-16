import os
from interface import DataInput
from utils.youtube_extractor import YoutubeExtractor
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from typing import List, Dict, Optional, Union
from class_mod.rest_qdrant import RestQdrantClient
import uuid
from dotenv import load_dotenv

load_dotenv()
class DataImporter:
    def __init__(self, qdrant_url: str = os.getenv("QDRANT_HOST"), collection_name: str = "demo_bge_m3"):
        self.model = SentenceTransformer("BAAI/bge-m3")
        # self.client = QdrantClient(url=qdrant_url)
        self.qdrant_url = qdrant_url
        self.client = None
        self.collection_name = collection_name
        self.youtube_extractor = YoutubeExtractor()
        self._init_qdrant()
        
        # Create collection if it doesn't exist
        self._create_collection()
    def _init_qdrant(self):
        """Initialize Qdrant client with error handling"""
        try:
            self.client = RestQdrantClient(url=self.qdrant_url,timeout=15)
            # Test connection
            self.qdrant_available = True
            print(f"Successfully connected to Qdrant at {self.qdrant_url}")
        except Exception as e:
            print(f"Warning: Could not connect to Qdrant: {e}")
            print("Running in offline mode - vector operations will be disabled")
            self.client = None
            self.qdrant_available = False
    def _create_collection(self):
        try:
            collections = self.client.get_collection(self.collection_name)
            if collections:
                print(f"Collection '{self.collection_name}' already exists.")
                return

            self.client.recreate_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=1024, distance=Distance.COSINE)
            )
            print(f"Collection '{self.collection_name}' created successfully")
        except Exception as e:
            print(f"Error creating collection: {e}")
    
    def encode_text(self, texts: Union[str, List[str]]) -> List[List[float]]:
        if isinstance(texts, str):
            texts = [texts]
        
        embeddings = self.model.encode(texts, normalize_embeddings=True)
        return embeddings.tolist()
    
    def insert_directly(self, collection: str, data: DataInput) -> str:
        point_id = str(uuid.uuid4())
        embedding = self.encode_text(data.plan_details)[0]
        payload = {
            "source": data.source,
            "name": data.name,
            "start_place": data.start_place.dict() if data.start_place else None,
            "destination_place": data.destination_place.dict() if data.destination_place else None,
            "country": data.country,
            "visited_place": [p.dict() for p in data.visited_place] if data.visited_place else [],
            "duration": data.duration,
            "budget": data.budget,
            "transportation": data.transportation,
            "accommodation": data.accommodation,
            "safety": data.safety,
            "theme": data.theme,
            "plan_details": data.plan_details
        }
        # collections = self.client.get_collection(collection)
        # if not collection:
        print(f"Collection '{collection}' does not exist. Creating it now.")
        self.client.recreate_collection(
            collection_name=collection,
            vectors_config=VectorParams(size=1024, distance=Distance.COSINE)
        )
        print({"collection": collection, "point_id": point_id, "embedding_length": len(embedding), "payload_keys": list(payload.keys())})
        self.client.upsert(
            collection_name=collection,
            points=[{"id": point_id, "vector": embedding, "payload": payload}]
        )
        print(f"Inserted text with ID: {point_id}")
        return point_id

    
    def insert_text(self, text: str, metadata: Optional[Dict] = None, custom_id: Optional[str] = None) -> str:
        point_id = custom_id or str(uuid.uuid4())
        embedding = self.encode_text(text)[0]
        payload = {"text": text}
        
        if metadata:
            payload.update(metadata)
        
        self.client.upsert(
            collection_name=self.collection_name,
            points=[{"id": point_id, "vector": embedding, "payload": payload}]
        )
        
        print(f"Inserted text with ID: {point_id}")
        return point_id
    
    def insert_texts(self, texts: List[str], metadata_list: Optional[List[Dict]] = None) -> List[str]:
        embeddings = self.encode_text(texts)
        point_ids = [str(uuid.uuid4()) for _ in texts]
        
        points = []
        for i, (text, embedding, point_id) in enumerate(zip(texts, embeddings, point_ids)):
            payload = {"text": text}
            if metadata_list and i < len(metadata_list):
                payload.update(metadata_list[i])
            
            points.append({"id": point_id, "vector": embedding, "payload": payload})

        self.client.upsert(collection_name=self.collection_name, points=points)
        print(f"Inserted {len(texts)} texts")
        return point_ids
    
    def insert_from_youtube(self, video_id: str, metadata: Optional[Dict] = None) -> Optional[str]:
        try:
            # Extract text from YouTube (assuming your YoutubeExtractor has this method)
            text = self.youtube_extractor.get_full_text(video_id)
            if text:
                video_metadata = {"source": "youtube", "video_id": video_id}
                if metadata:
                    video_metadata.update(metadata)
                
                return self.insert_text(text, video_metadata)
            return None
        except Exception as e:
            print(f"Error extracting from YouTube: {e}")
            return None
    
    def search_similar(self, query: str, limit: int = 1) -> List[Dict]:
        """Search with Qdrant availability check - always returns a list"""
        if not self.qdrant_available or not self.client:
            print("Warning: Qdrant not available, returning empty results")
            return []
        
        try:
            query_embedding = self.encode_text(query)[0]
            
            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=limit,
                timeout=15
            )
            print(f"Search results: {results}")
            return [
                {
                    "id": result['id'],
                    "score": float(result['score']) if result['score'] else 0.0,
                    "text": result['payload'].get("text", ""),
                    "metadata": {k: v for k, v in result['payload'].items() if k != "text"}
                }
                for result in results['result']
            ]
        except Exception as e:
            print(f"Error searching: {e}")
            raise ValueError(f"Search failed: {str(e)}")

    def coldStartDatabase(self):
        coldstart_texts = "I want to go to Chiang Mai"
        try:
            query_embedding = self.encode_text(coldstart_texts)[0]
            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=1,
                timeout=10
            )
            print(f"Cold start results: {results}")
        except Exception as e:
            print(f"finish cold start, with error: {e}")

        