# Ultimate Deployment Guide
*How to make your Netlify link work by putting the Backend in the Cloud.*

You need to do **3 Steps**. I cannot do them for you because they require your Email and Password.

## Step 1: Put Database in the Cloud (MongoDB Atlas)
1.  Go to [MongoDB.com](https://www.mongodb.com/) and Click **"Try Free"**.
2.  Sign up with Google.
3.  Create a **"Shared" (Free)** Cluster. (Select AWS -> generic region -> Create).
4.  **Create a User**:
    *   Username: `admin`
    *   Password: `password123` (or whatever you want, remember it!).
    *   Click **"Create User"**.
5.  **Network Access**:
    *   IP Address: `0.0.0.0/0` (Click "Allow Access from Anywhere").
    *   Confirm.
6.  **Get Connection String**:
    *   Click "Connect" -> "Drivers".
    *   Copy the string like: `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/...`
    *   **SAVE THIS STRING.** Replace `<password>` with your actual password.

## Step 2: Put Backend in the Cloud (Render)
1.  Go to [Render.com](https://render.com/) and Sign Up (GitHub/Google).
2.  Click **"New +"** -> **"Web Service"**.
3.  **Connect Code**:
    *   Select your `hotel-booking-system` repository from GitHub.
4.  **Settings**:
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Environment Variables** (Click "Advanced"):
        *   Key: `MONGO_URI`
        *   Value: *(Paste the Connection String from Step 1)*
5.  Click **"Create Web Service"**.
6.  Wait for it to finish. Copy the **URL** (e.g., `https://my-hotel.onrender.com`).

## Step 3: Connect Frontend to Backend
1.  Open your **VS Code**.
2.  Go to `simple_frontend/script.js`.
3.  Change Line 1:
    ```javascript
    // OLD
    // const API_URL = 'http://localhost:5000/api';
    
    // NEW (Paste your Render URL)
    const API_URL = 'https://my-hotel.onrender.com/api';
    ```
4.  **Push the changes**:
    *   `git add .`
    *   `git commit -m "Updated API URL"`
    *   `git push`
5.  **Re-deploy to Netlify**:
    *   Drag the folder to Netlify again.

**Done!** Now your Netlify link works for everyone.
