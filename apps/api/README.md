# QuickNotes API

A RESTful API server for the QuickNotes application, built with Go and Gin framework.

## Features

- CRUD operations for notes
- SQLite database with GORM
- Search functionality
- Pagination support
- CORS enabled for Tauri frontend
- Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/health` - Check API status

### Notes
- `GET /api/v1/notes` - Get all notes (with pagination and search)
  - Query parameters:
    - `page` (default: 1)
    - `limit` (default: 10)
    - `search` - Search in title and content
- `GET /api/v1/notes/:id` - Get a specific note
- `POST /api/v1/notes` - Create a new note
- `PUT /api/v1/notes/:id` - Update a note
- `DELETE /api/v1/notes/:id` - Delete a note

## Note Schema

```json
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "tags": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## Development

```bash
# Run in development mode
go run main.go

# Or using Turbo (from root directory)
pnpm dev --filter=api

# Build for production
go build -o dist/api main.go

# Run tests
go test ./...
```

## Environment Variables

- `PORT` - Server port (default: 8080)

## Database

The API uses SQLite for data storage. The database file (`notes.db`) will be created automatically in the current directory when the server starts. 