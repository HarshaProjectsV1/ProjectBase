# Chat App

This is a simple chat application built with React, Vite, and Supabase.

## Features
- User authentication using Supabase.
- Real-time chat functionality.
- Responsive UI with React and CSS.

## Prerequisites
- Node.js (v16 or later)
- npm or yarn
- A Supabase account

## Getting Started

## Demo Credentials

Use the following credentials to log in and test the chat application:

### User 1 (Sender/Receiver)
- **Email**: `harsga6@gmail.com`
- **Password**: `Vision@360`

### User 2 (Sender/Receiver)
- **Email**: `harsga7@gmail.com`
- **Password**: `Vision@360`

---
### 1. Clone the Repository
```bash
git clone <repository-url>
cd chat-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:
```properties
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-anon-key
```
Replace `your-supabase-url` and `your-supabase-anon-key` with the values from your Supabase project.

### 4. Start the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Supabase Integration

### Setting Up Supabase
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to the "API" section in your Supabase dashboard to get your `URL` and `anon key`.
3. Add the `messages` table in your Supabase database with the following schema:
   - `id`: integer (Primary Key, Auto Increment)
   - `sender_id`: text
   - `receiver_id`: text
   - `message`: text
   - `created_at`: timestamp (default: `now()`)

### Authentication
The app uses Supabase's authentication system for user login. Users can sign in with their email and password.

### Real-Time Messaging
The app uses Supabase's real-time capabilities to listen for new messages and update the chat interface dynamically.

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## Folder Structure
```
chat-app/
├── src/
│   ├── components/       # React components
│   ├── context/          # App context for state management
│   ├── styles/           # CSS files
│   ├── supabaseClient.js # Supabase client setup
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # Documentation
```

## Deployment
To deploy the app, build it using:
```bash
npm run build
```
Then serve the `dist` folder using a static file server or deploy it to a platform like Vercel or Netlify.

## License
This project is licensed under the MIT License.
#   P r o j e c t B a s e  
 #   P r o j e c t B a s e  
 