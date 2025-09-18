## 🛠️ Project Setup & Run

### Prerequisites
Install python package manaer
- [uv package manager documentation](https://docs.astral.sh/uv/)

### 1. Install dependencies
Sync all dependencies from `pyproject.toml` (if available):
```sh
uv sync
```

### 2. Configure environment variables
Create a `.env` file (see `.env.example` for reference) and set, for example:
```env
QDRANT_HOST=http://qdrant.taspolsd.dev # this is our test server (not the server that poc uses)
SEALION_API=your-sealion-api-key
SEALION_BASE_URL=https://api.sea-lion.ai/v1
```
Adjust values as needed for your environment.

### 3. Run the AI Service
Start the main service:
```sh
uv run uvicorn app:app --reload --host 0.0.0.0 --port 9000
```

### Notes
- Make sure your Qdrant vector database is running and accessible.
- For development, you can use the provided scripts and modules directly.

## 📝 API Documentation

All endpoints are served from your running FastAPI server (default: http://localhost:9000)

### Root & Health
- `GET /` — Root endpoint, returns service status

### Trip Planning
- `POST /v1/generateTripPlan` — Generate a trip plan
  - Request body: `PlanRequest`
  - Response: `PlanResponse`
  - Example: [http://localhost:9000/v1/generateTripPlan](http://localhost:9000/v1/generateTripPlan)

### Collection Management
- `POST /v1/addDirectlyToCollection` — Add data directly to a Qdrant collection
  - Request body: `DatabaseInput`
  - Response: `str` (point ID)
  - Example: [http://localhost:9000/v1/addDirectlyToCollection](http://localhost:9000/v1/addDirectlyToCollection)

### Chat
- `POST /v1/basicChat` — Basic chat with the LLM agent
  - Request body: `ChatRequest`
  - Response: `str`
  - Example: [http://localhost:9000/v1/basicChat](http://localhost:9000/v1/basicChat)

## 🧪 API Testing with Postman

You can test the API endpoints using the provided Postman collection file: `API_test.postman_collection.json` (located in this folder).

**How to use:**
1. Open [Postman](https://www.postman.com/downloads/).
2. Click `Import` in the top left.
3. Select the file `API_test.postman_collection.json` from this directory.
4. You will see pre-configured requests for health check, trip plan generation, and chat.
5. Make sure your local server is running at `http://localhost:9000` before sending requests.

This makes it easy to try out and debug the API endpoints interactively.




