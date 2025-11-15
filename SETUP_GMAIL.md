# Gmail Setup Instructions

## Step 1: Create .env file

Create a file named `.env` in your project root directory with the following content:

```
GMAIL_USER=kamelelmedjadji@gmail.com
GMAIL_APP_PASSWORD=YOUR_APP_PASSWORD_HERE
```

## Step 2: Get Your Gmail App Password

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Under "Signing in to Google", click "2-Step Verification"
   - Follow the steps to enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in if prompted
   - Under "Select app", choose "Mail"
   - Under "Select device", choose "Other (Custom name)" and type "Portfolio Server"
   - Click "Generate"
   - Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

3. **Add App Password to .env file**:
   - Open your `.env` file
   - Replace `YOUR_APP_PASSWORD_HERE` with the 16-character password (remove spaces)
   - Example: `GMAIL_APP_PASSWORD=abcdefghijklmnop`

## Step 3: Verify Setup

1. Make sure your `.env` file is in the project root (same folder as `server.js`)
2. Restart your server: `npm start`
3. You should see: "Email server is ready to send messages" in the console
4. Test by submitting the contact form on your portfolio

## Important Notes

- **Never commit the `.env` file to Git** - it contains sensitive information
- The App Password is different from your regular Gmail password
- If you change your Google account password, you may need to generate a new App Password
- The email will be sent TO your Gmail address (kamelelmedjadji@gmail.com)

## Troubleshooting

If emails aren't sending:
- Check that 2-Step Verification is enabled
- Verify the App Password is correct (no spaces)
- Check the server console for error messages
- Make sure nodemailer is installed: `npm install nodemailer dotenv`

