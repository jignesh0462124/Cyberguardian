# CyberGuardian Content Moderation

A React application that uses AI to analyze text for toxicity, hate speech, misinformation, and potential cyber threats.

## Features

- Real-time content analysis using OpenAI API
- Toxicity scoring from 0-10
- Content flagging for potentially harmful content
- Recommendation system for content moderation

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/cyberguardian.git
cd cyberguardian
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with your OpenAI API key:
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

## Running the Application

To run both the frontend and backend concurrently:
```
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Technologies Used

- React
- TypeScript
- Express
- OpenAI API
- CSS 