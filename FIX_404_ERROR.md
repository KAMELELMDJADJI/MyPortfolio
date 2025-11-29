# 🚨 URGENT: Fix 404 Error on Production

## Current Issue
You're getting **404 NOT_FOUND** when trying to access `/api/send` on production.

## Quick Fix Steps

### Step 1: Add Environment Variables (CRITICAL!)
1. Go to https://vercel.com/dashboard
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:
   - Name: `GMAIL_USER` | Value: `your-email@gmail.com`
   - Name: `GMAIL_APP_PASSWORD` | Value: `your-16-char-app-password`
5. Make sure to select **Production**, **Preview**, and **Development** for both

### Step 2: Test the API
After Vercel redeploys (wait ~1-2 minutes), visit:

**Test endpoint:** `https://my-portfolio-fwjoe7eo6-kamelelmdjadji-projects.vercel.app/api/test`

Expected response:
```json
{
  "status": "ok",
  "message": "API is working!",
  "hasGmailUser": true,
  "hasGmailPassword": true
}
```

✅ **If you see this** → API routing works! The contact form should work now.

❌ **If you still get 404** → Continue to Step 3

### Step 3: Force Redeploy
1. Go to your Vercel dashboard
2. Click **Deployments**
3. Click the three dots (⋯) on the latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

### Step 4: Check Deployment Logs
1. In Vercel dashboard, click on the latest deployment
2. Look for the **Functions** tab
3. You should see:
   - ✅ `api/send.js`
   - ✅ `api/test.js`

If these aren't listed, there's a build error. Check the **Build Logs** tab.

## What I Fixed

✅ Created simplified `vercel.json` configuration
✅ Added `/api/test.js` diagnostic endpoint
✅ Updated deployment documentation
✅ Pushed all changes to GitHub

## Files Changed
- `vercel.json` - Simplified Vercel configuration
- `api/test.js` - New test endpoint for diagnostics
- `DEPLOYMENT_FIX.md` - Updated troubleshooting guide
- `.env.example` - Example environment variables

## Why This Happens

The 404 error occurs because:
1. **Missing environment variables** can cause Vercel to fail building the function
2. **Vercel needs explicit configuration** for serverless functions
3. **First deployment** sometimes needs a manual redeploy

## Next Steps

1. ✅ Add environment variables to Vercel (MOST IMPORTANT!)
2. ✅ Wait for automatic redeploy (~1-2 minutes)
3. ✅ Test `/api/test` endpoint
4. ✅ Test contact form on production site
5. ✅ If still broken, force redeploy from Vercel dashboard

## Need More Help?

Check the detailed guide: `DEPLOYMENT_FIX.md`

Or check Vercel deployment logs for specific error messages.
