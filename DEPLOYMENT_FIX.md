# 🚀 Production Deployment Fix Guide

## Problem
The contact form works on localhost but fails in production with "Error: Error sending message"

## Root Causes
1. ❌ Missing environment variables on Vercel
2. ❌ Missing Vercel configuration file
3. ❌ Serverless function not properly configured

## ✅ Solution Steps

### Step 1: Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project: `my-portfolio-9h1ndp93m-kamelelmdjadji-projects.vercel.app`
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `GMAIL_USER` | your-email@gmail.com | Production, Preview, Development |
   | `GMAIL_APP_PASSWORD` | your-16-char-app-password | Production, Preview, Development |

   > ⚠️ **Important**: Use a Gmail App Password, NOT your regular Gmail password!
   > See `SETUP_GMAIL.md` for instructions on creating an App Password.

### Step 2: Verify Vercel Configuration

The `vercel.json` file has been created with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

This tells Vercel:
- Build all files in `/api/` as Node.js serverless functions
- Route `/api/*` requests to the appropriate serverless function
- Set NODE_ENV to production

### Step 3: Deploy Changes

The changes have been committed and pushed to GitHub. Vercel will automatically:
1. Detect the new `vercel.json` configuration
2. Rebuild your project
3. Deploy the updated version

### Step 4: Verify Deployment

1. Wait for Vercel to finish deploying (check your Vercel dashboard)
2. Visit your production site
3. Try submitting the contact form
4. You should receive a success message!

## 🔍 Troubleshooting

### **404 NOT_FOUND Error**

If you're seeing a 404 error when trying to access `/api/send`, this means Vercel can't find the serverless function. Here's how to fix it:

#### 1. **Test the API Endpoint**
First, verify that Vercel can serve API routes at all:

Visit: `https://your-site.vercel.app/api/test`

This should return:
```json
{
  "status": "ok",
  "message": "API is working!",
  "timestamp": "2025-11-29T14:00:00.000Z",
  "environment": "production",
  "hasGmailUser": true,
  "hasGmailPassword": true
}
```

**If this works but `/api/send` doesn't:**
- The routing is fine, but there's an issue with the `send.js` file
- Check Vercel deployment logs for build errors

**If this also returns 404:**
- Vercel isn't recognizing the `/api` folder as serverless functions
- Continue with the steps below

#### 2. **Check Vercel Deployment Logs**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on the latest **Deployment**
4. Look for any build errors or warnings
5. Check the **Functions** tab to see if `api/send.js` is listed

#### 3. **Verify Project Structure**
Make sure your project structure looks like this:
```
portfilio/
├── api/
│   ├── send.js      ← Serverless function
│   └── test.js      ← Test endpoint
├── index.html
├── vercel.json
└── package.json
```

#### 4. **Force Redeploy**
Sometimes Vercel needs a fresh deployment:

**Option A: Via Dashboard**
1. Go to your Vercel project
2. Click **Deployments**
3. Find the latest deployment
4. Click the three dots (⋯) → **Redeploy**

**Option B: Via Git**
```bash
git commit --allow-empty -m "Force redeploy"
git push
```

#### 5. **Check Environment Variables**
Even though you get 404, missing env vars can cause build failures:

1. Go to **Settings** → **Environment Variables**
2. Verify both variables are set:
   - ✅ `GMAIL_USER`
   - ✅ `GMAIL_APP_PASSWORD`
3. Make sure they're enabled for **Production**
4. After adding/changing, click **Redeploy** on the latest deployment

### If the form still doesn't work:


#### 1. Check Vercel Logs
- Go to your Vercel project dashboard
- Click on **Deployments**
- Click on the latest deployment
- Check the **Functions** tab for any errors

#### 2. Verify Environment Variables
- Go to **Settings** → **Environment Variables**
- Make sure both `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set
- Make sure they're enabled for **Production** environment

#### 3. Test the API Endpoint Directly
Open your browser console and run:

```javascript
fetch('https://your-site.vercel.app/api/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'Test message'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

#### 4. Common Issues

| Issue | Solution |
|-------|----------|
| "Method not allowed" | API endpoint is working but receiving wrong HTTP method |
| "All fields are required" | Form data not being sent correctly |
| "Error sending message" | Gmail credentials are incorrect or missing |
| "EAUTH" error in logs | Gmail App Password is wrong or not set |
| 404 on `/api/send` | Vercel routing not configured (check vercel.json) |

## 📝 How It Works

### Local Development
- Uses Express server (`server.js`) running on port 3000
- Endpoint: `http://localhost:3000/send`
- Environment variables from `.env` file

### Production (Vercel)
- Uses serverless function (`api/send.js`)
- Endpoint: `https://your-site.vercel.app/api/send`
- Environment variables from Vercel dashboard

### Client-Side Detection
The form automatically detects the environment:

```javascript
const origin = window.location.origin;
const isLocal = origin.includes('localhost');
const endpoint = isLocal ? 'http://localhost:3000/send' : '/api/send';
```

## ✨ Next Steps

After fixing the deployment:

1. ✅ Test the contact form on production
2. ✅ Verify you receive emails
3. ✅ Test on different devices/browsers
4. ✅ Consider adding rate limiting to prevent spam
5. ✅ Add CAPTCHA for additional security (optional)

## 📚 Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Nodemailer Documentation](https://nodemailer.com/)

---

**Need Help?** Check the Vercel deployment logs or contact support if issues persist.
