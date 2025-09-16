# Hiking App API Documentation

This directory contains the API documentation server for the Hiking App backend.

## 🚀 Quick Start

### Run Documentation Server

The API documentation server runs on port **5050** and provides an interactive Swagger UI where you can test all API endpoints.

```bash
# From the backend directory
npm run docs:serve
```

This will start the documentation server at: http://localhost:5050

### Access the Documentation

- **Swagger UI**: http://localhost:5050/api-docs
- **API Specs (JSON)**: http://localhost:5050/api-docs.json
- **Health Check**: http://localhost:5050/health

## 📚 Features

### Interactive API Testing
- Test all API endpoints directly from the browser
- Built-in request/response examples
- Authentication support (JWT Bearer tokens)
- File upload testing capabilities

### Comprehensive Documentation
- Complete API endpoint documentation
- Request/response schemas
- Authentication requirements
- Error response formats
- Example requests and responses

### API Categories
- **Authentication**: User registration, login, logout, token refresh
- **Users**: User profile management
- **Trips**: Trip planning and management
- **Trails**: Trail information and search
- **Search**: Advanced search capabilities
- **AI**: AI-powered features (chat, speech-to-text, recommendations)
- **Uploads**: File upload operations

## 🔐 Authentication

Most endpoints require authentication. To test protected endpoints:

1. First, call the `/api/v1/auth/login` endpoint to get a JWT token
2. Click the "Authorize" button in the Swagger UI
3. Enter your token in the format: `Bearer YOUR_JWT_TOKEN`
4. Now you can test protected endpoints

## 🛠️ Configuration

The documentation server is configured in `src/swagger-server.ts` and includes:

- **Custom styling** for better user experience
- **CORS enabled** for cross-origin requests
- **Persistent authorization** - tokens are remembered during your session
- **Request duration display** - see how long requests take
- **Filter support** - quickly find specific endpoints

## 📝 Adding New Documentation

To add documentation for new endpoints:

1. Create new documentation files in `src/swagger-docs/`
2. Use JSDoc format with `@swagger` annotations
3. The documentation server will automatically pick up new files
4. Restart the docs server to see changes

## 🔗 Related Commands

```bash
# Start main API server (usually port 5000)
npm run dev

# Start documentation server (port 5050)
npm run docs:serve

# Generate static documentation JSON
npm run docs

# Build the project
npm run build
```

## 🌐 Environment Variables

The documentation uses the same environment configuration as the main API server. Make sure your `.env` file is properly configured.

## 📞 Support

If you encounter any issues with the API documentation:

1. Check that the documentation server is running on port 5050
2. Ensure your environment variables are set correctly
3. Verify that the main API server is running if you want to test endpoints
4. Check the console for any error messages

---

**Happy API Testing! 🏔️**
