const nodemailer = require("nodemailer");

const sendEmail = async (username,surname,email, otp) => {
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
      subject: "Your one-time password ",
      text: `Your OTP for registration is: ${otp}`,
      html: ` <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>Title</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #d4d4d4;
        min-height: 100%;

        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-size: 16px;
      }
      .navbar {
        padding: 10px;
        background-color: #15803d;
        color: #f3f4f6;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .navbar h1 {
        text-align: center;
      }

      .container {
        margin-top: 10px;
        padding: 25px;
        border-radius: 8px;
        /* box-shadow: 2px 3px 4px 0 #15803d; */
        background-color: #f4f4f5;
      }

      .container h1 {
        color: #15803d;
      }

      .text {
        font-weight: 550;
        color: #525252;
      }



      .code {
        padding: 10px 20px;
        border: 2px solid #15803d;
        letter-spacing: 0.5em;
  text-align: center;
  max-width:35%;
  width:fit-content;
        border-radius: 8px;
        box-shadow: 2px 2px 0 0 #059669;
        color: #047857;
        font-weight: bold;
      }

      footer {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #15803d;
        color: #f3f4f6;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      footer h4 {
        text-align: right;
      }

      .contact .email,
      .address {
        font-size: 12px;
        color: #f3f4f6;
      }



      .copyright {
        text-align: center;
        font-size: 10px;
      }

      @media only screen and (max-width: 600px) {
        .container h1 {
          font-size: 1.2rem;
        }

        .text {
          font-size: 0.8rem;
        }
        .code {
         
          letter-spacing: 0.5em;
        }

        footer h4 {
          text-align: center;
        }
        .contact .email,
        .address {
          font-size: 0.7rem;
        }

        .copyright {
          font-size: 0.6rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="navbar">
      <h1>Auth OTP-JWT</h1>
    </div>

    <div class="container">
      <h1>Welcome ${username} ${surname}👋</h1>
      <p class="text">Your two-factor authentication code to log in!</p>
      <p class="code">${otp}</p>
    </div>

    <footer>
      <h4>SoftwareBKM</h4>
      <div class="contact">
        <p class="email">Email: softwarebkm@outlook.com</p>
        <p class="address">
          Contact: BKM Grup Consultancy Communication and Sales Trade Inc.
          BeyLikdüzü / İstanbul
        </p>
      </div>


      <p class="copyright">© 2024 SoftwareBKM</p>
    </footer>
  </body>
</html>`,
    });

    console.log("your one-time password sent to mail");
  } catch (error) {
    console.log("email not sent error: " + error);
  }
};
module.exports = sendEmail;
