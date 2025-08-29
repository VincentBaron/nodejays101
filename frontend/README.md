# React Frontend for NodeJays101

This is a React TypeScript frontend application that connects to your NestJS REST API.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open the Application**
   - Frontend: http://localhost:3001
   - The app will automatically proxy API requests to your NestJS server at http://localhost:3000

## 🏗️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **React Query** - Powerful data fetching and caching
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── SetCard.tsx     # Display music sets
│   │   ├── Track.tsx       # Display individual tracks
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── lib/                # Utilities and configuration
│   │   ├── api.ts          # Axios setup
│   │   ├── queries.ts      # API functions
│   │   └── hooks.ts        # Custom React hooks with React Query
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # API types (User, Set, Track)
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Features

### 📊 **Set Display**
- Beautiful cards showing music sets
- User information with profile pictures
- Track listings with cover art
- Like indicators and counts
- Direct links to Spotify

### 🔄 **React Query Integration**
- Intelligent caching and background updates
- Automatic refetching strategies
- Loading states and error boundaries
- Retry mechanisms
- Developer tools for debugging

### 📱 **Responsive Design**
- Mobile-first approach
- Tailwind CSS utilities
- Clean, modern interface
- Accessible components

### 🔗 **REST API Integration**
- Type-safe API calls with Axios
- Automatic error handling
- Cookie-based authentication
- Request/response interceptors

## 🔧 Configuration

### **Axios Setup**
The app is configured to:
- Send cookies for authentication
- Handle errors gracefully
- Automatically retry failed requests

### **Proxy Setup**
Vite is configured to proxy `/api` requests to your NestJS server:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
  },
}
```

## 🎯 API Integration

The frontend expects your NestJS REST API to be running at `http://localhost:3000/api`.

### **REST Endpoint**
```
GET /api/sets
```

### **Response Format**
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

### **Authentication**
The app sends cookies automatically for authentication. Make sure your NestJS server:
1. Is running on port 3000
2. Has CORS enabled for localhost:3001
3. Accepts cookie-based authentication

## 🎨 Styling

The app uses Tailwind CSS for styling with:
- Responsive grid layouts
- Hover effects and animations
- Professional color schemes
- Accessibility-friendly contrast

## 🔍 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **React Query Devtools**
The app includes React Query devtools for debugging:
- View cached queries
- Monitor query status
- Inspect background updates
- Debug performance issues

### **Environment Variables**
Create a `.env` file if you need to customize:
```env
VITE_API_URL=http://localhost:3000
```

## 🚦 Next Steps

1. **Add Mutations**: Implement create/update/delete operations
2. **Infinite Queries**: Add pagination for large datasets
3. **Optimistic Updates**: Immediate UI updates before API confirmation
4. **Offline Support**: Cache data for offline usage
5. **Real-time**: Add WebSocket integration
6. **Testing**: Add unit and integration tests
7. **PWA**: Convert to Progressive Web App

## 🎵 Usage

1. **View Sets**: Browse through your personalized music sets
2. **Explore Tracks**: Click on tracks to see details
3. **Spotify Integration**: Click "Open in Spotify" to play tracks
4. **Like System**: See which tracks you've liked and total likes
5. **User Info**: See who created each set
6. **Auto-refresh**: Data automatically updates in the background

## ⚡ Performance Features

- **Smart Caching**: React Query caches API responses intelligently
- **Background Updates**: Data refreshes automatically when stale
- **Request Deduplication**: Multiple identical requests are merged
- **Error Recovery**: Automatic retry with exponential backoff
- **Memory Management**: Garbage collection of unused cache entries

The app provides a smooth, fast user experience with modern data fetching patterns!
