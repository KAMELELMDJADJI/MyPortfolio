const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // Serve static files from the current directory

// Create messages directory if it doesn't exist
const messagesDir = path.join(__dirname, 'messages');
if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir);
}

// Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
    }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("Email configuration error:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

// API Route to Save Contact Form Data to File
app.post("/send", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const timestamp = new Date().toISOString();
        const messageData = {
            timestamp,
            name,
            email,
            phone,
            message
        };

        // Save to CSV file
        const csvLine = `"${timestamp}","${name}","${email}","${phone}","${message.replace(/"/g, '""')}"\n`;
        const csvFile = path.join(messagesDir, 'contact_messages.csv');
        
        // Add header if file doesn't exist
        if (!fs.existsSync(csvFile)) {
            fs.writeFileSync(csvFile, 'Timestamp,Name,Email,Phone,Message\n');
        }
        
        fs.appendFileSync(csvFile, csvLine);

        // Also save to individual text file
        const textFile = path.join(messagesDir, `message_${Date.now()}.txt`);
        const textContent = `Contact Form Message
================
Date: ${new Date().toLocaleString()}
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
================
`;

        fs.writeFileSync(textFile, textContent);

        // Send email to Gmail
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to your own Gmail
            subject: `New Contact Form Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2C3E50; border-bottom: 2px solid #F5B041; padding-bottom: 10px;">
                        New Contact Form Message
                    </h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong style="color: #2C3E50;">Name:</strong> ${name}</p>
                        <p><strong style="color: #2C3E50;">Email:</strong> ${email}</p>
                        <p><strong style="color: #2C3E50;">Phone:</strong> ${phone}</p>
                        <p><strong style="color: #2C3E50;">Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #F5B041; margin: 20px 0;">
                        <p><strong style="color: #2C3E50;">Message:</strong></p>
                        <p style="color: #555; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #BDC3C7; color: #888; font-size: 12px;">
                        <p>This message was sent from your portfolio contact form.</p>
                    </div>
                </div>
            `,
            replyTo: email // So you can reply directly to the sender
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Don't fail the request if email fails, message is still saved
        }

        res.status(200).json({ message: "Message sent successfully!" });
        
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ message: "Error saving message" });
    }
});

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Messages will be saved to: ${messagesDir}`);
});

