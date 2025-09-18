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
QDRANT_HOST=http://qdrant.taspolsd.dev
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
- `GET /health` — Health check endpoint
- `GET /v1` — Service info and health

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

### Search
- `POST /v1/searchSimilar` — Search for similar content in a collection
  - Request body: `DatabaseRequest`
  - Response: `list[dict]`
  - Example: [http://localhost:9000/v1/searchSimilar](http://localhost:9000/v1/searchSimilar)

### Chat
- `POST /v1/basicChat` — Basic chat with the LLM agent
  - Request body: `ChatRequest`
  - Response: `str`
  - Example: [http://localhost:9000/v1/basicChat](http://localhost:9000/v1/basicChat)

---




