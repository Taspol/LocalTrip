import os
import requests

class RestQdrantClient:
    def __init__(self, url, api_key=None, verify=True, timeout=5):
        print(f"this is url: {url}")
        if url is None:
            raise ValueError("Qdrant URL must not be None. Please set the QDRANT_HOST environment variable or provide a URL.")
        self.url = url.rstrip("/")
        self.session = requests.Session()
        self.session.verify = verify
        self.session.headers.update({"Content-Type": "application/json"})
        if api_key:
            self.session.headers.update({"api-key": api_key})
        self.timeout = timeout

    def get_collections(self):
        r = self.session.get(f"{self.url}/collections", timeout=self.timeout)
        r.raise_for_status()
        return r.json()

    def get_collection(self, collection_name):
        r = self.session.get(f"{self.url}/collections/{collection_name}", timeout=self.timeout)
        r.raise_for_status()
        return r.json()
    def search(self, collection_name, query_vector, limit=10, with_payload=True,timeout=1):
        payload = {
            "vector": query_vector,
            "limit": limit,
            "with_payload": with_payload
        }
        r = self.session.post(
            f"{self.url}/collections/{collection_name}/points/search",
            json=payload,
            timeout=timeout
        )
        r.raise_for_status()
        return r.json()

    def delete_collection(self, collection_name):
        r = self.session.delete(f"{self.url}/collections/{collection_name}", timeout=self.timeout)
        if r.status_code not in [200, 404]:  # 404 means collection didn't exist
            r.raise_for_status()
        return r.json() if r.text else {}

    def create_collection(self, collection_name, vector_size, distance="Cosine"):
        payload = {
            "vectors": {
                "size": vector_size,
                "distance": distance.upper()  # "COSINE", "EUCLIDEAN", "DOT"
            }
        }
        r = self.session.put(f"{self.url}/collections/{collection_name}", json=payload, timeout=self.timeout)
        r.raise_for_status()
        return r.json()
    def recreate_collection(self, collection_name, vector_size, distance="Cosine"):
        # Delete if exists
        self.delete_collection(collection_name)
        # Create new collection
        return self.create_collection(collection_name, vector_size, distance)
    def upsert(self, collection_name, points):
        r = self.session.put(
            f"{self.url}/collections/{collection_name}/points",
            json={"points": points},
            timeout=self.timeout
        )
        r.raise_for_status()
        return r.json()

# Example usage:
client = RestQdrantClient(
    url= os.getenv("QDRANT_HOST"),
    api_key="YOUR_API_KEY",   # or None
    verify=False              # only if needed
)

print(client.get_collections())
