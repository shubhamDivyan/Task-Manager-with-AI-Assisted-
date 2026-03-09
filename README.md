# Task Manager - Full Stack Project

## Project Structure

```
Task/
├── server/
│   ├── package.json
│   └── server.js
└── client/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── App.css
```

## Setup Instructions

### Backend (Express Server)

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `https://task-manager-with-ai-assisted.onrender.com/`

**Features:**
- CORS enabled
- JSON parsing middleware
- `/api/health` - Health check endpoint
- `/api/tasks` - Get all tasks
- `/api/tasks` - Create a new task (POST)

### Frontend (React + Vite)

1. Navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will run on `https://task-manager-with-ai-assisted-5hbzt4vb0.vercel.app/`

**Features:**
- React hooks (useState, useEffect)
- Fetch tasks from the API
- Server health check
- Responsive UI with CSS styling
- API proxy to backend

## API Endpoints

- `GET /api/health` - Check if server is running
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task

## Running Both Servers

Open two terminals:

**Terminal 1 (Backend):**
```bash
cd server && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client && npm run dev
```

Visit `http://localhost:5173` in your browser.
