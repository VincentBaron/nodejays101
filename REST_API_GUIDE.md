# NodeJays101 - REST API Version

This project has been converted from GraphQL to REST API with React Query for better performance and simpler integration.

## 🏗️ Architecture Overview

### Backend (NestJS)
- **REST API** endpoints instead of GraphQL
- **TypeORM** for database operations
- **Cookie-based authentication**
- **CORS enabled** for frontend integration

### Frontend (React + TypeScript)
- **React Query** for data fetching and caching
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## 🚀 Quick Start

### 1. Setup NestJS Backend

```bash
# Install NestJS dependencies
cp nestjs-package.json package.json
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Start the server
npm run start:dev
```

The backend will run on: http://localhost:3000

### 2. Setup React Frontend

```bash
# Move to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on: http://localhost:3001

## 📡 API Endpoints

### REST API Structure

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sets` | Get all music sets for authenticated user |

### Example API Response

```json
[
  {
    "id": "1",
    "name": "Chill Vibes",
    "link": "https://spotify.com/set/1",
    "dummy": false,
    "user": {
      "id": "1",
      "username": "john_doe",
      "profilePicURL": "https://example.com/profile.jpg"
    },
    "tracks": [
      {
        "id": "1",
        "name": "Song Title",
        "artist": "Artist Name",
        "uri": "spotify:track:abc123",
        "imgURL": "https://example.com/cover.jpg",
        "liked": true,
        "likesCount": 42
      }
    ]
  }
]
```

## 🔧 Configuration

### Backend Configuration

**Environment Variables (.env):**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=3000
```

**CORS Setup:**
The NestJS app is configured to accept requests from localhost:3001 with credentials.

### Frontend Configuration

**Axios Configuration:**
```typescript
// src/lib/api.ts
export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**React Query Configuration:**
```typescript
// src/main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

## 🎯 Key Features

### 1. **Data Fetching with React Query**
- Automatic caching
- Background refetching
- Loading and error states
- Retry mechanisms
- Devtools integration

### 2. **Type Safety**
- TypeScript interfaces for all API responses
- Type-safe API calls
- Compile-time error checking

### 3. **Authentication**
- Cookie-based authentication
- Automatic credential inclusion
- Protected API endpoints

### 4. **Error Handling**
- Axios interceptors for global error handling
- User-friendly error messages
- Retry functionality

### 5. **Performance**
- React Query caching reduces API calls
- Optimistic updates support
- Background data synchronization

## 🎨 Frontend Components

### Core Components

1. **SetCard** - Displays music set information
2. **Track** - Individual track component with Spotify integration
3. **LoadingSpinner** - Loading state indicator
4. **ErrorMessage** - Error handling with retry option

### Custom Hooks

1. **useSets** - Fetches and manages sets data with React Query

## 🔄 Data Flow

1. **Authentication**: User cookies sent automatically with requests
2. **API Call**: React Query triggers API call via Axios
3. **Caching**: Response cached by React Query
4. **UI Update**: Components re-render with new data
5. **Background Sync**: React Query handles background updates

## 📊 Advantages over GraphQL

### 1. **Simplicity**
- No complex schema definitions
- Standard HTTP methods
- Easier debugging with browser dev tools

### 2. **Caching**
- Better HTTP caching support
- React Query's intelligent caching
- Less complex cache invalidation

### 3. **Performance**
- Smaller bundle size (no GraphQL runtime)
- HTTP/2 multiplexing benefits
- Better browser caching

### 4. **Tooling**
- Standard REST debugging tools
- Better browser network tab support
- Easier testing with curl/Postman

## 🧪 Testing the Application

### 1. **Backend Health Check**
```bash
curl http://localhost:3000/api/sets
```

### 2. **Frontend Development**
- Open http://localhost:3001
- Open browser devtools to see React Query devtools
- Check Network tab for API calls

### 3. **Authentication Test**
Make sure your authentication cookies are properly set for the API calls to work.

## 🔧 Development Tools

### React Query Devtools
- Inspect cache state
- Debug query status
- Monitor background updates
- View query timeline

### Browser Network Tab
- Monitor API requests
- Check response times
- Debug authentication issues

## 🚦 Next Steps

1. **Add More Endpoints**: Create, update, delete sets
2. **Implement Mutations**: Use React Query mutations for data modification
3. **Add Pagination**: Implement infinite queries for large datasets
4. **Offline Support**: Add offline-first capabilities
5. **Real-time Updates**: WebSocket integration for live updates
6. **Testing**: Add unit and integration tests
7. **Performance**: Implement request deduplication and batching

## 📱 Mobile Support

The frontend is fully responsive and works great on mobile devices with:
- Touch-friendly interface
- Responsive grid layouts
- Mobile-optimized loading states
- Gesture-friendly interactions

This REST API version provides better performance, simpler debugging, and more familiar patterns while maintaining all the functionality of the original GraphQL implementation!
