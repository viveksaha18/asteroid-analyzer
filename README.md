# Asteroid Risk Assessment & Visualization Platform

## Project Overview

An advanced web application for asteroid data analysis, risk assessment, and interactive 3D visualization. This platform provides real-time asteroid tracking, risk engine calculations, and immersive 3D visualization of celestial objects and their orbital patterns.

## Team Information

**Team Name:** Sniper

**Team Members:**

- Vivek Saha
- Tapan Kumar Panda
- Soumya Ranjan Sahoo
- Ranjan Kumar Mohanty

## Features

- 🌍 **3D Asteroid Visualization** - Interactive 3D rendering of asteroids and celestial objects
- 🛰️ **Real-time Data Integration** - External API integration for live asteroid data
- ⚠️ **Risk Assessment Engine** - Advanced algorithms for asteroid risk calculation
- 🎨 **Interactive UI** - Beautiful, responsive user interface with animated backgrounds
- 🌌 **Orbital Mechanics** - Accurate visualization of orbital patterns and interactions
- 📊 **Statistics Dashboard** - Comprehensive statistics and data insights
- 🔐 **User Authentication** - Secure login and signup system

## Technology Stack

### Frontend

- **Framework:** React 18
- **Build Tool:** Vite
- **3D Graphics:** Three.js / WebGL
- **Styling:** CSS3
- **Routing:** React Router
- **State Management:** React Hooks
- **Linting:** ESLint

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Architecture:** MVC Pattern
- **Services:** External API Integration, Risk Engine

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── app.js              # Express application setup
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Request handlers (API Controller)
│   │   ├── routes/             # API routes definition
│   │   └── services/           # Business logic
│   │       ├── externalApi.service.js    # External API integration
│   │       └── riskEngine.service.js     # Risk assessment logic
│   ├── server.js               # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Asteroid3DViewer.jsx
│   │   │   ├── AsteroidBackground3D.jsx
│   │   │   ├── AsteroidCard.jsx
│   │   │   ├── CardOrbitViewer.jsx
│   │   │   ├── FloatingParticles3D.jsx
│   │   │   ├── InteractiveStars3D.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OrbitViewer3D.jsx
│   │   │   ├── Planet3D.jsx
│   │   │   └── StatsBar.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GetStarted.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── utils/              # Utility functions
│   │   │   └── auth.js
│   │   ├── App.jsx             # Main application component
│   │   ├── main.jsx            # Entry point
│   │   └── styles/             # Global styles
│   ├── vite.config.js          # Vite configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── package.json
│   └── index.html
│
└── README.md                   # This file
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with WebGL support

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (create `.env` file):

```
PORT=5000
NODE_ENV=development
EXTERNAL_API_KEY=your_api_key_here
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (create `.env` file):

```
VITE_API_URL=http://localhost:5000/api
```

## Running the Project

### Development Mode

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for Production

**Backend:**

```bash
cd backend
npm run build
```

**Frontend:**

```bash
cd frontend
npm run build
```

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Available Endpoints

- **GET /asteroids** - Fetch asteroid data
- **GET /asteroids/:id** - Get specific asteroid details
- **POST /risk-assessment** - Calculate risk assessment
- **Get /stats** - Retrieve statistics data

_For detailed API documentation, refer to the backend API controller_

## Key Components

### Frontend Components

- **Asteroid3DViewer** - 3D visualization of individual asteroids
- **OrbitViewer3D** - Display orbital mechanics and paths
- **InteractiveStars3D** - Dynamic star field background
- **AsteroidCard** - Card component displaying asteroid information
- **StatsBar** - Real-time statistics display

### Backend Services

- **externalApi.service.js** - Handles external API calls for asteroid data
- **riskEngine.service.js** - Core risk assessment algorithms

## Features in Detail

### 1. Asteroid Visualization

- Real-time 3D rendering of asteroids
- Customizable visualization parameters
- Interactive camera controls

### 2. Risk Assessment

- Multi-factor risk calculation
- Risk scoring system
- Historical analysis

### 3. User System

- Secure authentication
- User profiles
- Personalized dashboards

### 4. Data Integration

- Real-time data from external sources
- Data validation and processing
- Cache management

## Performance Optimizations

- Lazy loading of components
- 3D rendering optimization
- API response caching
- Efficient state management

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions from the community. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Style

- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent indentation

## Troubleshooting

### Frontend Issues

- Clear browser cache if experiencing UI glitches
- Ensure WebGL is enabled in your browser
- Check browser console for error messages

### Backend Issues

- Verify Node.js version compatibility
- Check environment variables are correctly set
- Ensure ports are not in use by other applications

## License

This project is developed for IIT Hackathon 2026.

## Support & Contact

For issues, questions, or suggestions, please contact the Sniper team members.

---

**Last Updated:** February 2026

**Version:** 1.0.0

---

**Team Sniper** - _Bringing Asteroid Intelligence to Life_
