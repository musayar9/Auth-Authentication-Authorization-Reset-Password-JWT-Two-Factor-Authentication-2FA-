const About = () => {
  return (
    <div className="px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-3  text-slate-700">About </h1>
      <p className="text-zinc-600 mb-4 font-semibold">
        This project is a full-stack (MERN - MongoDB, Express.js, React,
        Node.js) project. On the server side, Node.js, Express.js, JSON Web
        Token (JWT), and MongoDB are used. On the client side, React, Redux
        Toolkit, Redux Persist, and Tailwind CSS are utilized
      </p>
      <p className="text-zinc-600 font-semibold  mb-3">
        User authentication is handled using Firebase, and Nodemailer is used
        for email sending. This project provides users with functionalities such
        as registration, login, logout, session deletion, identity verification,
        password reset, and two-factor authentication. When a user registers for
        the first time, their account is verified by entering a 6-character code
        sent to their email address. Additionally, every time a user logs in, a
        one-time password is sent to their email address as an extra security
        layer. If a user forgets their password, they can reset it by clicking
        on the link sent to their email.
      </p>

      <p className="text-zinc-600 font-semibold  mb-3">
        Furthermore, users can register to the system using their GitHub or
        Google accounts.
      </p>
    </div>
  );
};

export default About;
