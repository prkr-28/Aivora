# 🚀 Aivora - AI-Powered Goal Intelligence System

A premium full-stack application that combines AI-powered goal planning with stunning UI animations. Aivora helps users create, track, and achieve their goals with personalized AI-generated roadmaps and intelligent progress insights.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Environment Setup](#-environment-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

Aivora is a next-generation goal management platform that leverages Google Gemini AI to:

- 🤖 **Generate personalized roadmaps** - AI creates 30-day structured plans based on your goals
- 📊 **Track progress intelligently** - Monitor daily tasks with sentiment analysis
- 💡 **Provide actionable insights** - Get AI-powered recommendations based on your progress
- 🎨 **Deliver stunning UX** - Glassmorphism design with rewarding animations
- 🔒 **Ensure security** - JWT authentication with encrypted data

## ✨ Features

### 🤖 AI-Powered Features

- **Smart Goal Planning**: Generate detailed 30-day roadmaps with daily tasks, difficulty levels, and time estimates
- **Progress Analysis**: AI analyzes your mood trends, motivation levels, and identifies blockers
- **Adaptive Regeneration**: Roadmaps adjust based on your progress and feedback
- **Insight Reports**: Weekly AI-generated summaries with recommendations

### 🎨 Frontend Highlights

- **Glassmorphism UI** with backdrop blur effects and gradient backgrounds
- **3D Tilt Effects** on interactive cards with mouse tracking
- **Staggered Animations** for smooth page load experiences
- **Rewarding Interactions**: Animated checkboxes, strike-through effects, and confetti celebrations
- **Dark/Light Mode** with seamless theme switching
- **Responsive Design** optimized for all devices

### 🔧 Backend Capabilities

- **RESTful API** with Express.js and TypeScript
- **MongoDB Integration** with Mongoose ODM
- **JWT Authentication** with secure token management
- **Rate Limiting** for API protection
- **Google Gemini AI** integration via LangChain
- **Sentiment Analysis** for progress tracking

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  Next.js 14 App Router • Zustand • Framer Motion • Axios    │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API (JWT Auth)
┌────────────────────▼────────────────────────────────────────┐
│                      API LAYER                               │
│    Express.js • TypeScript • JWT Middleware • Rate Limit    │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐    ┌──────────▼──────────┐
│  DATABASE      │    │   AI ENGINE         │
│  MongoDB       │    │  Google Gemini      │
│  Mongoose ODM  │    │  LangChain          │
└────────────────┘    └─────────────────────┘
```

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: Radix UI
- **Theme**: next-themes
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini 1.5 Flash via LangChain
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, cors
- **Rate Limiting**: express-rate-limit

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas account)
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/prkr-28/aivora.git
cd aivora
```

2. **Setup Backend**
```bash
cd aivora-backend-main
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

3. **Setup Frontend** (in a new terminal)
```bash
cd aivora-frontend-main
npm install

# Start development server
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
aivora/
├── aivora-backend-main/
│   ├── src/
│   │   ├── ai/                    # AI/LangChain integration
│   │   │   ├── chains/           # Goal planner, insights, regeneration
│   │   │   ├── config/           # Gemini model configuration
│   │   │   ├── prompts/          # AI prompt templates
│   │   │   └── utils/            # AI utilities
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Auth, error handling, rate limiting
│   │   ├── models/              # Mongoose schemas (User, Goal, Progress, Insight)
│   │   ├── routes/              # API route definitions
│   │   └── server.ts            # Entry point
│   └── package.json
│
└── aivora-frontend-main/
    ├── src/
    │   ├── app/                  # Next.js 14 App Router pages
    │   │   ├── dashboard/        # Main dashboard
    │   │   ├── create-goal/      # Goal creation
    │   │   ├── goal/[id]/        # Goal detail & tracking
    │   │   ├── login/            # Authentication
    │   │   └── register/         # User registration
    │   ├── components/           # React components
    │   │   └── ui/              # Reusable UI components
    │   ├── lib/                 # API client & utilities
    │   └── store/               # Zustand state management
    └── package.json
```

## ⚙️ Environment Setup

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/aivora
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aivora

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend CORS
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📡 API Documentation

### Authentication Endpoints

```http
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # Login user
GET    /api/auth/me            # Get current user (protected)
```

### Goal Management

```http
POST   /api/goals                      # Create goal + AI roadmap
GET    /api/goals                      # Get all user goals
GET    /api/goals/:id                  # Get specific goal
PUT    /api/goals/:id                  # Update goal
DELETE /api/goals/:id                  # Delete goal
POST   /api/goals/:id/regenerate       # Regenerate roadmap with AI
```

### Progress Tracking

```http
POST   /api/progress                   # Create/update daily progress
GET    /api/progress/goal/:goalId      # Get goal progress
GET    /api/progress/goal/:goalId/stats # Get statistics
PUT    /api/progress/:id               # Update progress entry
```

### AI Insights

```http
POST   /api/insights/generate/:goalId  # Generate AI insights
GET    /api/insights/goal/:goalId      # Get all insights
GET    /api/insights/goal/:goalId/latest # Get latest insight
```

### Example: Create Goal

```bash
curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn React",
    "description": "Master React fundamentals and hooks",
    "duration": 30,
    "hoursPerDay": 2,
    "additionalContext": "Focus on functional components"
  }'
```

## 🚀 Deployment

### Backend Deployment

**Option 1: Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

```bash
docker build -t aivora-backend .
docker run -p 5000:5000 --env-file .env aivora-backend
```

**Option 2: Traditional Hosting (Heroku, Railway, Render)**

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment

**Vercel (Recommended)**

```bash
npm install -g vercel
vercel deploy
```

**Environment Variables on Vercel:**
- `NEXT_PUBLIC_API_URL` - Your backend API URL

## 🎯 Key Features Deep Dive

### AI Chains

#### 1. Goal Planner Chain
Generates structured 30-day roadmaps with:
- Daily tasks with descriptions
- Difficulty levels (Easy/Medium/Hard)
- Estimated hours per task
- Focus areas and learning objectives

#### 2. Insight Analyzer Chain
Analyzes user behavior to provide:
- Mood trend graphs
- Motivation scores (0-100)
- Identified blockers
- Personalized recommendations
- Achievement highlights

#### 3. Regeneration Chain
Dynamically adjusts roadmaps based on:
- Progress velocity
- User feedback
- Difficulty preferences
- Time constraints

### Frontend Animations

- **Page Transitions**: Staggered animations with 0.1s delay
- **Task Completion**: Multi-step animation with confetti
- **Button States**: Transform animations for AI generation
- **Progress Bars**: Smooth fill with shimmer effects
- **Modal Interactions**: Spring animations for natural feel

## 📊 Data Models

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  createdAt: Date
}
```

### Goal
```typescript
{
  userId: ObjectId
  title: string
  description: string
  duration: number
  hoursPerDay: number
  status: 'active' | 'completed' | 'abandoned'
  roadmap: Day[]
  completedDays: number
  startDate: Date
}
```

### Progress
```typescript
{
  goalId: ObjectId
  userId: ObjectId
  day: number
  completed: boolean
  comment: string
  hoursSpent: number
  sentimentScore: number (-1 to 1)
}
```

## 🔒 Security Features

- **bcrypt** password hashing (10 salt rounds)
- **JWT** authentication with 7-day expiration
- **Helmet.js** for HTTP headers security
- **CORS** protection with whitelist
- **Rate limiting** on all endpoints
- **Input validation** on all requests
- **Environment variable** protection

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Verify MONGODB_URI in .env
- Check network connectivity
- Ensure MongoDB service is running

**Gemini API Errors**
- Verify API key is valid
- Check rate limits (60 req/min)
- Ensure billing is enabled on Google Cloud

**CORS Errors**
- Add frontend URL to CORS whitelist
- Check FRONTEND_URL in backend .env

**JWT Token Invalid**
- Ensure JWT_SECRET matches between sessions
- Clear localStorage and re-login
- Check token expiration settings

## 📚 Documentation

- [Backend README](./aivora-backend-main/README.md) - Detailed backend documentation
- [Frontend README](./aivora-frontend-main/README.md) - Detailed frontend documentation

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use async/await for asynchronous operations
- Add proper error handling
- Write descriptive commit messages
- Test both light and dark modes (frontend)
- Document complex AI logic

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **LangChain** for AI orchestration
- **Framer Motion** for beautiful animations
- **Vercel** for Next.js framework

## 📞 Support

For support, email support@aivora.com or open an issue on GitHub.

---

**Built with 💜 by the Aivora Team**

*Powered by Google Gemini 1.5 Flash 🤖*
