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

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vinobc/course-plan-app.git
cd course-plan-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
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

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

### 5. Run the Application

```bash
npm run dev
```

The application will start running at `http://localhost:5173` by default. If port 5173 is already in use, Vite will automatically use the next available port (like 5174).

## Deployment Instructions

### Server Setup

1. Update system packages:

```bash
sudo apt-get update
sudo apt-get upgrade
```

2. Install required software:

```bash
# Install curl
sudo apt-get install curl

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js
nvm install --lts

# Install nginx
sudo apt-get install -y nginx
```

### Application Deployment

1. Clone the repository:

```bash
git clone https://github.com/vinobc/course-plan-app.git
cd course-plan-app
```

2. Install dependencies and build:

```bash
npm install
npm run build
```

3. Configure nginx:

```bash
sudo nano /etc/nginx/sites-available/course-plan-app
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-ip-address;  # Update this with your IP

    root /home/your-username/course-plan-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/course-plan-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

5. Set permissions:

```bash
sudo chmod -R 755 ~/course-plan-app/dist
```

6. Test and restart nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Managing IP Changes

When your VM IP changes, follow these steps:

1. Get the new IP:

```bash
curl ifconfig.me
```

2. Update nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/course-plan-app
# Update the server_name with new IP
```

3. Restart nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Updating the Application

To update the deployed application:

```bash
cd ~/course-plan-app
git pull origin master
npm install
npm run build
sudo systemctl restart nginx
```

## Usage

### Registration

- Only email addresses ending with `@amity.edu` or `@blr.amity.edu` are allowed
- To register as an admin, use the admin code: `CP-Admin-2025@AUB`
- Regular faculty members can register without an admin code

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
- Admins can view and edit all plans

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── contexts/       # Context providers
  ├── pages/          # Main application pages
  ├── styles/         # CSS and Tailwind styles
  ├── firebase.js     # Firebase configuration
  └── App.jsx         # Main application component
```

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
     ```javascript
     export default defineConfig({
       server: {
         port: YOUR_PREFERRED_PORT,
       },
       // ... other config
     });
     ```

5. Deployment issues
   - Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
   - Verify nginx configuration syntax: `sudo nginx -t`
   - Check application permissions: `ls -la ~/course-plan-app/dist`

## License

This project is licensed under the MIT License
