<h1 align="center" id="title">MERN Authentication System</h1>

<p id="description">This project is a user authentication system built using the MERN stack (MongoDB Express React Node.js). It enables users to register and log in with an added feature of Google authentication for a seamless experience</p>

<h2>🚀 Demo</h2>

[https://user-auth-frontend-wosf.onrender.com/](https://user-auth-frontend-wosf.onrender.com/)

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   User Registration: Users can register with a username email and password.
*   User Login: Registered users can log in with their credentials.
*   Google Authentication: Users can log in or register with their Google account.
*   Protected Routes: Restrict access to specific pages unless the user is logged in.
*   Session Management: User session is maintained across pages.

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/UmeshSingh2000/User-Auth
cd mern-authentication-system
```

<p>2. Install dependencies(For Server)</p>

```
cd backend
npm install
```

<p>3. Install dependencies(For Client)</p>

```
cd frontend
npm install
```

<p>4. Set up environment variables(Create a .env file in the server directory and add the following environment variables)</p>

```
PORT=5000
MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

<p>5. Start backend Server</p>

```
cd server
npm run dev
```

<p>6. Start the Client</p>

```
cd frontend npm run dev
```

<h2>💻 Built with</h2>

Technologies used in the project:

*   Frontend: React Axios React Router
*   Backend: Node.js Express.js
*   Database: MongoDB
*   Authentication: JWT (JSON Web Tokens) for session management and Passport.js for Google OAuth
