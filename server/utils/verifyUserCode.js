const nodemailer = require("nodemailer");

const verifyUserCode = async(email, otp)=>{

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
    });

    console.log("your account verification code sent to mail");
  } catch (error) {
    console.log("email not sent error: " + error);
  }
}

module.exports = verifyUserCode