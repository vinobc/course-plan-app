# Course Plan App

A web application for faculty members to create, manage, and track course plans. Built with React, Vite, Firebase, and Tailwind CSS.

## Features

- User authentication (Login/Register) with email restrictions
- Role-based access control (Admin/Faculty)
- Create, view, edit, and manage course plans
- PDF generation of course plans
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Firebase account

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/your-username/course-plan-app.git
cd course-plan-app
```

### 2. Install Dependencies

```
npm install
```

### 3. Firebase Setup

1. Create a new Firebase project at (https://console.firebase.google.com/)
2. Enable Authentication with Email/Password sign-in method
3. Enable Firestore Database
4. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to 'Your apps'
   - Click the web icon (</>)
   - Register your app
   - Copy the firebaseConfig object

### 4. Configure Firebase in the Project

Create or update `src/firebase.js` with your Firebase configuration:

```
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "your-api-key",
authDomain: "your-auth-domain",
projectId: "your-project-id",
storageBucket: "your-storage-bucket",
messagingSenderId: "your-messaging-sender-id",
appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

### 5. Run the Application

```
npm run dev
```

The application will start running at `http://localhost:5173` by default. If port 5173 is already in use, Vite will automatically use the next available port (like 5174).

## Usage

### Registration

- Only email addresses ending with `@amity.edu` or `@blr.amity.edu` are allowed

### Creating Course Plans

1. Log in to your account
2. Navigate to Dashboard
3. Click "Create New Plan"
4. Fill in the course details
5. Save or generate PDF

### Viewing and Editing Plans

- All plans are visible on the dashboard
- Click on a plan to view details
- Edit option is available for your own plans

## Project Structure

```
src/
├── components/ # Reusable UI components
├── contexts/ # Context providers
├── pages/ # Main application pages
├── styles/ # CSS and Tailwind styles
├── firebase.js # Firebase configuration
└── App.jsx # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. Login/Register not working

   - Verify Firebase configuration
   - Check if email domain is allowed
   - Ensure AuthProvider is wrapping the application

2. Blank page after login

   - Check browser console for errors
   - Verify route protection in App.jsx
   - Ensure Firebase rules are set correctly

3. PDF generation issues

   - Check browser console for errors
   - Verify all required data is present

4. Port conflicts
   - By default, the app runs on port 5173
   - If port 5173 is in use, Vite will automatically try the next available port
   - To specify a custom port, you can configure it in vite.config.js:
   ```
    export default defineConfig({
    server: {
    port: YOUR_PREFERRED_PORT,
    },
    // ... other config
    });
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details
