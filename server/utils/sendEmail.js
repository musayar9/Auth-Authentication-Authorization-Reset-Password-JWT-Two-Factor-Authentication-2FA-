const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
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
    });

    console.log("your one-time password sent to mail");
  } catch (error) {
    console.log("email not sent error: " + error);
  }
};
module.exports = sendEmail;
