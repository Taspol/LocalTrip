from fastapi import FastAPI

from interface import PlanRequest, PlanResponse, TripPlan , YoutubeLinkRequest, YoutubeLinkResponse, ChatRequest
from data_importer import DataImporter
from utils.llm_caller import LLMCaller
import asyncio
import time
from datetime import datetime
from fastapi import FastAPI, HTTPException
import logging

app = FastAPI()
data_importer = DataImporter()
agent = LLMCaller()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/")
def root():
    """Root endpoint - Hugging Face checks this"""
    return {
        "message": "PAN-SEA Travel Planning API is running",
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "PAN-SEA Travel Planning API"
    }

@app.get("/v1")
def greet_json():
    start_time = time.time()
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "SealionAI Travel Planning Service",
        "version": "1.0.0",
        "checks": {}
    }
    return health_status
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds
@app.post("/v1/generateTripPlan", response_model=PlanResponse)
def generate_trip_plan(request: PlanRequest):
    data_importer.coldStartDatabase()
    
    for attempt in range(MAX_RETRIES):
        try:
            logger.info(f"Generating trip plan - attempt {attempt + 1}/{MAX_RETRIES}")
            trip_plan = asyncio.run(agent.query_with_rag(request))
            return PlanResponse(
                tripOverview=trip_plan.tripOverview,
                query_params=request,
                retrieved_data=trip_plan.retrieved_data,
                trip_plan=trip_plan.trip_plan,
                preparation=trip_plan.preparation,
                meta={
                    "status": "success", 
                    "timestamp": datetime.utcnow().isoformat(),
                    "attempt": attempt + 1
                }
            )
        except Exception as e:
            logger.warning(f"Error on attempt {attempt + 1}: {e}")

            # If this was the last attempt, raise the error
            if attempt == MAX_RETRIES - 1:
                logger.error(f"All {MAX_RETRIES} attempts failed due to timeout")
                raise HTTPException(
                    status_code=504,  # Gateway Timeout
                    detail={
                        "error": "Request timeout",
                        "message": f"Failed to generate trip plan after {MAX_RETRIES} attempts",
                        "details": "The service is experiencing high load. Please try again later."
                    }
                )
            
            # Wait before retrying
            logger.info(f"Retrying in {RETRY_DELAY} seconds...")
            time.sleep(RETRY_DELAY)


@app.post("/v1/addYoutubeLink", response_model=YoutubeLinkResponse)
def add_youtube_link(request: YoutubeLinkRequest):
    try:
        data_importer.insert_from_youtube(request.video_id)
        return YoutubeLinkResponse(
                    message="add successfully",
                    video_url=f"https://www.youtube.com/watch?v={request.video_id}"
                )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid video ID: {str(e)}")
    except Exception as e:
        logger.error(f"Error adding YouTube link: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": "Failed to add YouTube link",
                "details": str(e)
            }
        )

@app.post("/v1/searchSimilar", response_model=list[dict])
def search_similar(request: YoutubeLinkRequest):
    try:
        results = data_importer.search_similar(query=request.video_id)
        return results
    except Exception as e:
        logger.error(f"Error during search: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Search failed",
                "message": "Unable to search similar content",
                "details": str(e)
            }
        )

@app.post("/v1/basicChat", response_model=str)
def basic_chat(request: ChatRequest):
    try:
        user_message = request.message
        print(f"User message: {user_message}")
        llm_response = asyncio.run(agent.basic_query(
            user_prompt=user_message
        ))
        return llm_response
    except Exception as e:
        logger.error(f"Error in basic_chat: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": "Failed to process chat request",
                "details": str(e)
            }
        )


