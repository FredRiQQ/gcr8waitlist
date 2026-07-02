console.log("Server file loaded");
const nodemailer = require("nodemailer");
require("dotenv").config();
console.log("Email:", process.env.EMAIL);
console.log("PASSWORD loaded:", !!process.env.PASSWORD);


const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL,
        pass: process.env.PASSWORD


    }

});

transporter.verify(function (error, success) {

    if (error) {
        console.log("SMTP ERROR:");
        console.log(error);
    } else {
        console.log("✅ SMTP Server is ready.");
    }
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());


app.use(express.static(__dirname));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/monroe.html");

});

app.post("/join", async (req, res)=>{

    console.log("===== /join route reached =====");

    const { name, email} = req.body;

    console.log("New Waitlist User");

    console.log(name);

    console.log(email);


    try {

        console.log("About to send first email...");

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.EMAIL,

            subject: "New G'Cr8 Waitlist Signup",

            html: `
            <h2>New waitlist Registration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong>${email}</p>
            `

        });

        console.log("First email sent");

        console.log("About to send Welcome email...");

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: email,

            subject: "Welcome to G'cr8",
            html: `
            <h1>Welcome to G'cr8!</h1>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for Joining the Movement.</p>
            <P>We're building a platform where creators can own their audience, sell their work and build a thriving communities</P>
            <p>We'll keep you updated and let you know as soon as early access is available.</p>
            <p>- G'cr8 Team</p>
            `
        });

        console.log("Second email sent");

        res.json({

            success: true,

            message: "You're officially on the waitlist!"

        });

    } catch (error) {

        console.error("========== EMAIL ERROR ==========");
        console.error(error);
        console.error(error.message);

        if (error.response) {
            console.log("Response:", error.response);
        }

        console.log("================================");

        res.status(500).json({

            success: false,

            message:"unable to send email."
        });

    }
});

app.listen(3000, () => {

    console.log("🚀 G'Cr8 Server Running");
    console.log("http://localhost:3000");

});
