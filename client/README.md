# MERN AI Image Analyzer

## Overview
MERN AI Image Analyzer is a full-stack web application that allows users to upload images and analyze them using the **Gemini API**. The application includes **user authentication** (login & signup) and provides AI-powered insights into the uploaded images.

## Features
- **User Authentication**: Secure login and signup using JWT authentication.
- **Image Upload**: Users can upload images for AI analysis.
- **AI Image Analysis**: Utilizes the **Gemini API** to analyze images and provide insights.
- **Dashboard**: Users can view and manage their analyzed images.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **AI API**: Gemini API

## Installation
### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- Gemini API Key

### Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/mern-ai-image-analyzer.git
   cd mern-ai-image-analyzer
   ```

2. **Install dependencies**
   ```sh
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the application**
   ```sh
   # Start backend server
   cd backend
   npm start
   
   # Start frontend server
   cd ../frontend
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user details (requires authentication)

### Image Analysis
- `POST /api/images/analyze` - Upload and analyze an image using Gemini API
- `GET /api/images` - Retrieve analyzed images for a user

## Deployment
To deploy the application, use services like **Vercel** (for frontend) and **Render/Heroku** (for backend).

## License
This project is licensed under the MIT License.


## Contact
For any questions, reach out at [dhaneshpatil130@gmail.com](mailto:dhaneshpatil130@gmail.com).
