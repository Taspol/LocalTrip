import os
import asyncio
import httpx
from dotenv import load_dotenv
from typing import List, Optional, Dict, Any
from dataclasses import dataclass
from qdrant_client import QdrantClient
from openai import OpenAI
from sentence_transformers import SentenceTransformer
from interface import PlanResponse, TripPlan, RetrievedItem, PlanRequest
from interface import DayTimeline, TimelineEntry, Spot, Budget, Permits, Safety, Contact, SafetyContacts
from interface import Preparation, PreparationItem
from class_mod.rest_qdrant import RestQdrantClient
import json 
from fastapi import HTTPException

load_dotenv()
SYSTEM_PROMPT = """You are a helpful travel assistant. Use the provided context to answer the user's question about travel destinations and places.
If the context doesn't contain relevant information, say so politely and provide general advice if possible. You have to answer in language you are asked."""
'''
'''
class LLMCaller:
    def __init__(self):
        # Environment variables
        self.client = OpenAI(
                                api_key=os.getenv("SEALION_API"),
                                base_url=os.getenv("SEALION_BASE_URL"),
                            )
        self.top_k = 1
        self.qdrant_host = os.getenv("QDRANT_HOST")
        self.qdrant = RestQdrantClient(
            url=self.qdrant_host,
            timeout=30
        )
        self.system_prompt = SYSTEM_PROMPT
        self.embedding_model = SentenceTransformer("BAAI/bge-m3")
        self.collection_name = "TripPlanData"
    
    async def basic_query(self, user_prompt: str, max_tokens: int = 2048, model: str = "aisingapore/Llama-SEA-LION-v3-70B-IT") -> str:
        
        try:
            completion = self.client.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": self.system_prompt
                    },
                    {
                        "role": "user",
                        "content": user_prompt
                    }
                ]
            )
            return completion.choices[0].message.content
                
        except Exception as e:
            print(f"Error calling LLM: {e}")
            return f"Error: Unable to get LLM response - {str(e)}"
    
    async def query_with_rag(self, plan_request: PlanRequest, collection_name: Optional[str] = None) -> 'PlanResponse':
        """
        Perform RAG query using PlanRequest, embed query, search Qdrant, and generate complete PlanResponse via LLM
        """
        print(plan_request)
        try:
            # 1. Create query string from PlanRequest - updated for new fields
            destination = plan_request.destination or plan_request.destination_place or "unknown destination"
            duration = plan_request.duration or plan_request.trip_duration_days or 1
            budget = plan_request.trip_price or 0
            
            query_text = f"Trip from {plan_request.start_place} to {destination}"
            
            # Add new fields to query
            if plan_request.travelDates:
                query_text += f" on {plan_request.travelDates}"
            if duration:
                query_text += f" for {duration} days"
            if budget:
                query_text += f" with budget {budget}"
            if plan_request.theme:
                query_text += f" {plan_request.theme} themed trip"
            if plan_request.interests:
                query_text += f" interested in {', '.join(plan_request.interests)}"
            if plan_request.budgetTier:
                query_text += f" {plan_request.budgetTier} budget tier"
            
            # 2. Generate embedding for the query
            query_embedding = self.embedding_model.encode(query_text, normalize_embeddings=True).tolist()
            
            # 3. Search Qdrant for similar content
            collection = collection_name or self.collection_name
            top_k = self.top_k
            
            search_results = self.qdrant.search(
                collection_name=collection,
                query_vector=query_embedding,
                limit=top_k,
                with_payload=True,
                timeout=30
            )
            
            # 4. Convert search results to RetrievedItem format
            retrieved_data = []
            context_text = ""

            results = []
            if 'result' in search_results:
                if isinstance(search_results['result'], dict) and 'points' in search_results['result']:
                    # New format: {'result': {'points': [...]}}
                    results = search_results['result']['points']
                else:
                    # Old format: {'result': [...]}
                    results = search_results['result']
            elif 'points' in search_results:
                # Direct points key (just in case)
                results = search_results['points']

            for result in results:
                place_id = result.get('id') or result.get('point_id', 'Unknown')
                payload = result.get('payload', {})
                retrieved_item = RetrievedItem(
                    place_id=place_id,
                    place_name=payload.get("place_name") or payload.get("name", "Unknown"),
                    score=result.get('score', 0.0),
                )
                retrieved_data.append(retrieved_item)
                visited_places = ""
                if isinstance(payload.get('visited_place'), list):
                    visited_places = "Visited: " + ", ".join(
                        [
                            f"{p.get('name', '')} (lat: {p.get('latitude', '')}, lon: {p.get('longitude', '')})"
                            for p in payload.get('visited_place', [])
                        ]
                    )
                    
                # Build context from all relevant fields in payload
                context_fields = [
                    payload.get("name", ""),
                    f"Start: {payload.get('start_place', {}).get('name', '')}" if isinstance(payload.get('start_place'), dict) else "",
                    f"Destination: {payload.get('destination_place', {}).get('name', '')}" if isinstance(payload.get('destination_place'), dict) else "",
                    f"Country: {payload.get('country', '')}",
                    visited_places,
                    f"Duration: {payload.get('duration', '')} days" if payload.get('duration') else "",
                    f"Budget: {payload.get('budget', '')} THB" if payload.get('budget') else "",
                    f"Transportation: {payload.get('transportation', '')}",
                    f"Accommodation: {payload.get('accommodation', '')}",
                    f"Safety: {payload.get('safety', '')}",
                    f"Theme: {payload.get('theme', '')}",
                    f"Plan details: {payload.get('plan_details', '')}",
                    f"Source: {payload.get('source', '')}",
                    payload.get("text", ""),  # fallback for generic text field
                ]
                # Filter out empty strings and join with newlines
                context_text += "\n" + "\n".join([field for field in context_fields if field])

            print(context_text)
            # 5. Create detailed prompt for LLM - updated with new fields
            llm_prompt = f"""Generate a travel plan in JSON format for:
            From: {plan_request.start_place} → To: {destination}
            Duration: {duration} days | Budget: {budget} ({plan_request.budgetTier or 'Mid-range'})
            Group: {plan_request.groupSize} people | Theme: {plan_request.theme or 'General'}
            Interests: {', '.join(plan_request.interests) if plan_request.interests else 'Sightseeing'}
            Transport: {plan_request.transportPref or 'Any'} | Stay: {plan_request.stayPref or 'Any'}
            Dates: {plan_request.travelDates or 'Flexible'}
            *Provide a latitude and longitude for each place in timeline and spots.*.

            Context: {context_text[:4000]}{"..." if len(context_text) > 4000 else ""}

            Return ONLY this JSON structure:
            {{
                "tripOverview": "2-3 paragraph trip overview",
                "preparation": {{
                    "overview": "General preparation guidance for this trip",
                    "items": [
                        {{"category": "Documents", "items": ["Passport", "Visa", "Travel insurance"], "notes": "Ensure passport validity"}},
                        {{"category": "Clothing", "items": ["Light clothing", "Rain jacket", "Comfortable shoes"], "notes": "Pack for tropical climate"}},
                        {{"category": "Equipment", "items": ["Camera", "Power bank", "First aid kit"], "notes": "Essential travel gear"}}
                    ],
                    "timeline": "2-3 weeks before departure"
                }},
                "trip_plan": {{
                    "title": "{duration}-day {plan_request.theme or 'travel'} trip to {destination}",
                    "date": "{plan_request.travelDates or 'Flexible'}",
                    "timeline": [
                        {{"day": 1, "activities": [{{"t": "08:30", "detail": "Activity"}}, {{"t": "12:00", "detail": "Lunch"}}, {{"t": "14:00", "detail": "Activity"}}, {{"t": "18:00", "detail": "Evening"}}]}},
                        {{"day": 2, "activities": [{{"t": "08:30", "detail": "Activity"}}, {{"t": "12:00", "detail": "Lunch"}}, {{"t": "14:00", "detail": "Activity"}}, {{"t": "18:00", "detail": "Evening"}}]}}
                    ],
                    "spots": [{{"name": "Location","latitude": float, "longitude": float, "time": "09:30-11:45", "notes": "Details"}}],
                    "budget": {{"transport": 500, "entrance": 200, "meals": 800, "accommodation": 1200, "activities": 600, "total": 3300}},
                    "permits": {{"needed": false, "notes": "Requirements", "seasonal": "Best time"}},
                    "safety": {{
                        "registration": "Safety info",
                        "checkins": "Check-in procedures", 
                        "sos": "Emergency: 1669",
                        "contacts": {{
                            "ranger": {{"name": "Tourist Police", "phone": "+66-2-123-4567"}},
                            "hospital": {{"name": "Local Hospital", "phone": "+66-2-310-3000"}},
                            "police": {{"name": "Police", "phone": "1155"}}
                        }}
                    }}
                }}
            }}

            Create preparation checklist based on destination, theme ({plan_request.theme or 'general'}), duration ({duration} days), and group size ({plan_request.groupSize} people).
            Include destination-specific requirements, climate considerations, and activity-specific gear.
            """
            
            # 6. Call LLM to generate structured trip plan
            llm_response = await self.basic_query(user_prompt=llm_prompt, max_tokens=24048)
            print(f"LLM Response: {llm_response}")
            
            # 7. Parse LLM response as JSON
            try:
                # Clean the response and parse JSON
                json_str = llm_response.strip()
                if json_str.startswith("```json"):
                    json_str = json_str[7:]
                if json_str.endswith("```"):
                    json_str = json_str[:-3]
                
                llm_data = json.loads(json_str)
                print(f"LLM Data: {llm_data}")
                
                # Convert to PlanResponse structure
                trip_plan_data = llm_data.get("trip_plan", {})

                # Parse timeline
                timeline_data = trip_plan_data.get("timeline", [])
                timeline = []
                for day_entry in timeline_data:
                    if isinstance(day_entry, dict) and "day" in day_entry and "activities" in day_entry:
                        activities = []
                        for activity in day_entry["activities"]:
                            if isinstance(activity, dict) and "t" in activity and "detail" in activity:
                                activities.append(TimelineEntry(t=activity["t"], detail=activity["detail"]))
                        
                        day_timeline = DayTimeline(day=day_entry["day"], activities=activities)
                        timeline.append(day_timeline)

                # Parse spots
                spots_data = trip_plan_data.get("spots", [])
                spots = [Spot(name=item["name"], latitude=item.get("latitude"), longitude=item.get("longitude"), time=item["time"], notes=item["notes"]) for item in spots_data]

                # Parse budget
                budget_data = trip_plan_data.get("budget", {})
                budget = Budget(
                    transport=budget_data.get("transport"),
                    entrance=budget_data.get("entrance"),
                    meals=budget_data.get("meals"),
                    accommodation=budget_data.get("accommodation"),
                    activities=budget_data.get("activities"),
                    total=budget_data.get("total")
                )

                # Parse permits
                permits_data = trip_plan_data.get("permits", {})
                permits = Permits(
                    needed=permits_data.get("needed", False),
                    notes=permits_data.get("notes", ""),
                    seasonal=permits_data.get("seasonal", "")
                ) if permits_data else None

                # Parse safety
                safety_data = trip_plan_data.get("safety", {})
                safety = None
                if safety_data:
                    contacts_data = safety_data.get("contacts", {})
                    contacts = SafetyContacts(
                        ranger=Contact(**contacts_data["ranger"]) if contacts_data.get("ranger") else None,
                        hospital=Contact(**contacts_data["hospital"]) if contacts_data.get("hospital") else None,
                        police=Contact(**contacts_data["police"]) if contacts_data.get("police") else None
                    )
                    safety = Safety(
                        registration=safety_data.get("registration", ""),
                        checkins=safety_data.get("checkins", ""),
                        sos=safety_data.get("sos", ""),
                        contacts=contacts
                    )
                
                preparation_data = llm_data.get("preparation", {})
                preparation = None
                if preparation_data:
                    prep_items = []
                    for item_data in preparation_data.get("items", []):
                        prep_item = PreparationItem(
                            category=item_data.get("category", ""),
                            items=item_data.get("items", []),
                            notes=item_data.get("notes", "")
                        )
                        prep_items.append(prep_item)
                    
                    preparation = Preparation(
                        overview=preparation_data.get("overview", ""),
                        items=prep_items,
                        timeline=preparation_data.get("timeline", "")
                    )

                trip_plan = TripPlan(
                    title=trip_plan_data.get("title", ""),
                    date=trip_plan_data.get("date", ""),
                    timeline=timeline,
                    spots=spots,
                    budget=budget,
                    permits=permits,
                    safety=safety
                )

                return PlanResponse(
                    tripOverview=llm_data.get("tripOverview", ""),
                    query_params=plan_request,
                    retrieved_data=retrieved_data,
                    trip_plan=trip_plan,
                    preparation=preparation,  # Add this line
                    meta={
                        "status": "success",
                        "query_text": query_text,
                        "results_count": len(retrieved_data),
                        "theme": plan_request.theme,
                        "interests": plan_request.interests,
                        "budget_tier": plan_request.budgetTier,
                        "group_size": plan_request.groupSize
                    }
                )
                
            except json.JSONDecodeError as e:
                print(f"Error parsing LLM JSON response: {e}")
                print(f"LLM Response: {llm_response}")
                
                fallback_budget = Budget(
                    transport=0.0,
                    entrance=0.0,
                    meals=0.0,
                    accommodation=0.0,
                    activities=0.0,
                    total=0.0
                )
                
            return PlanResponse(
                tripOverview=llm_response[:500] + "..." if len(llm_response) > 500 else llm_response,
                query_params=plan_request,
                retrieved_data=retrieved_data,
                trip_plan=TripPlan(
                    title="Error occurred",
                    date="",
                    timeline=[],
                    spots=[],
                    budget=fallback_budget,
                    permits=None,
                    safety=None
                ),
                preparation=None,  # Add this line
                meta={"status": "error", "error": str(e)}
            )
            
        except Exception as e:
            print(f"Error in RAG query: {e}")
            
            fallback_budget = Budget(
                transport=0.0,
                entrance=0.0,
                meals=0.0,
                accommodation=0.0,
                activities=0.0,
                total=0.0
            )
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Internal server error",
                    "message": str(e),
                    "details": "An unexpected error occurred while processing the request."
                }
            )

            

