const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

    module.exports = async (req, res) => {
        console.log("Request method:", req.method);
        console.log("EMAIL exists:", !!process.env.EMAIL);
        console.log("PASSWORD exists:", !!process.env.PASSWORD);

        if (req.method !== "POST") {
            return res.status(405).json({
                success: false,
                message: "Method Not Allowed",
            });
        }

        try {
            const { name, email } = req.body;

            if (!name || !email) {
                return res.status(400).json({
                    success: false,
                    message: "name and email are required.",
                });
            }

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: "New G'cr8 waitlist Signup",
                html: `
                <h2>New Waitlist Registration</h2> 
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                `,
            });

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Welcome to G'cr8!",
                html: `
                <h1>Welcome to G'cr8!</h1>
                <p>Hello <strong>${name}</strong>,</p>
                
                <p>
                Thank you for joining the Movement.
                </p>

                <p>
                We're building a platform where creators can own their audience,
                sell their work directly, and build thriving communities.
                </p>

                <p>
                You'll be among the first to know when we launch.
                </p>
                <br>
                <p>- The G'cr8 Team</p>
                `,
            });

            return res.status(200).json({
                success: true,
                message: "You're officially on the waitlist!",
            });
        } catch (error) {
            console.error("FULL ERROR:", error);

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

    };