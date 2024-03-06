const nodemailer = require("nodemailer");

const verifyUserCode = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.NODE_EMAIL_USER,
        pass: process.env.NODE_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Software BKM"  <softwarebkm@outlook.com>',
      to: email,
      subject: "verify your account",
      text: `your account verification code ${otp}`,
      html: `    <html>
    <head>
        <style>
          
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: red;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Verify User Code</h1>
            <p>your account verification code ${otp}</p>
        </div>
    </body>
    </html>`,
    });

    console.log("your account verification code sent to mail");
  } catch (error) {
    console.log("email not sent error: " + error);
  }
};

module.exports = verifyUserCode;
