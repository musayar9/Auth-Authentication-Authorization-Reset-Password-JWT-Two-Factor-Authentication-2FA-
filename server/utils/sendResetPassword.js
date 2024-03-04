const nodemailer = require("nodemailer");

const sendResetPassword = async (user, email, url) => {
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
    subject: "Reset Password ",
    text:url,
      html: `
   <h1>Welcome To Software BKM</h1>
   <p>Click link</p>
        <p>Hello ${user.username}, verify your email... </p>
<a href='${url}'>Password Reset</a>      
      `,
    });

    console.log("Your reset password", url);
  } catch (error) {
    console.log("email not sent error: " + error);
  }
};
module.exports = sendResetPassword;
