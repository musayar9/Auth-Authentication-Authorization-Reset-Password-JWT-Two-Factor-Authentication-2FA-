## Auth Verify User- Reset Password- Two-Factor Authentication (2FA)

## [Live Demo](https://two-factor-authetication-jwt.onrender.com/)

## Server Side Technology

![NodeJs](https://img.shields.io/badge/Nodejs-20.9.0-yellowgreen)
![bcryptjs](https://img.shields.io/badge/bcryptjs-2.4.3-green)
![body-parser](https://img.shields.io/badge/body--parser-1.20.2-yellow)
![cloudinary](https://img.shields.io/badge/cloudinary-2.0.3-blue)
![cookie-parser](https://img.shields.io/badge/cookie--parser-1.4.6-red)
![cors](https://img.shields.io/badge/cors-2.8.5-orange)
![crypto](https://img.shields.io/badge/crypto-1.0.1-purple)
![dotenv](https://img.shields.io/badge/dotenv-16.4.5-brightgreen)
![express](https://img.shields.io/badge/express-4.18.2-lightblue)
![express-fileupload](https://img.shields.io/badge/express--fileupload-1.4.3-lightgrey)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-9.0.2-darkblue)
![mongodb](https://img.shields.io/badge/mongodb-6.3.0-darkgreen)
![mongoose](https://img.shields.io/badge/mongoose-8.2.0-darkred)
![nodemailer](https://img.shields.io/badge/nodemailer-6.9.10-pink)
![nodemon](https://img.shields.io/badge/nodemon-3.1.0-gold)
![validator](https://img.shields.io/badge/validator-13.11.0-silver)

## Client Side Technology

![reduxjs/toolkit](https://img.shields.io/badge/reduxjs/toolkit-2.2.1-green)
![autoprefixer](https://img.shields.io/badge/autoprefixer-10.4.17-yellow)
![axios](https://img.shields.io/badge/axios-1.6.7-blue)
![firebase](https://img.shields.io/badge/firebase-10.8.1-red)
![flowbite-react](https://img.shields.io/badge/flowbite--react-0.7.2-orange)
![postcss](https://img.shields.io/badge/postcss-8.4.35-purple)
![prop-types](https://img.shields.io/badge/prop--types-15.8.1-brightgreen)
![react](https://img.shields.io/badge/react-18.2.0-lightblue)
![react-dom](https://img.shields.io/badge/react--dom-18.2.0-lightgrey)
![react-helmet](https://img.shields.io/badge/react--helmet-6.1.0-darkblue)
![react-icons](https://img.shields.io/badge/react--icons-5.0.1-darkgreen)
![react-loader-spinner](https://img.shields.io/badge/react--loader--spinner-6.1.6-darkred)
![react-redux](https://img.shields.io/badge/react--redux-9.1.0-pink)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.22.1-gold)
![redux-persist](https://img.shields.io/badge/redux--persist-6.0.0-silver)
![tailwindcss](https://img.shields.io/badge/tailwindcss-3.4.1-lightgreen)

## Project Content

This project is a full-stack (MERN - MongoDB, Express.js, React, Node.js) project. On the server side, Node.js, Express.js, JSON Web Token (JWT), and MongoDB are used. On the client side, React, Redux Toolkit, Redux Persist, and Tailwind CSS are utilized

User authentication is handled using Firebase, and Nodemailer is used for email sending. This project provides users with functionalities such as registration, login, logout, session deletion, identity verification, password reset, and two-factor authentication. When a user registers for the first time, their account is verified by entering a 6-character code sent to their email address. Additionally, every time a user logs in, a one-time password is sent to their email address as an extra security layer. If a user forgets their password, they can reset it by clicking on the link sent to their email.

Furthermore, users can register to the system using their GitHub or Google accounts.

## Features

- **Sign Up**
- **Sign In**
- **Authentication**
- **Authorization**
- **Reset Password**
- **Two Factor Authentication**
- **Sing Out**
- **Delete Account**

### Endpoints -->

## Installation

1. Clone the repository:

```javascript
git clone https://github.com/musayar9/Two-Factor-Authetication---JWT.git
```

2. Install dependencies server;

```
npm install
```

or

```
yarn
```

3. Install dependencies client;

```
cd client
```

```
npm install
```

or

```
yarn
```

## Usage

Before run the app, add the following information to the .env file in the root directory:

1.a) Server Side

```javascript
BASE_URL = http://localhost:5173/
NODE_EMAIL_USER = "<Your Nodemailer Email Address>"
NODE_EMAIL_PASS = "<Your Nodemailer Password>"
JWT_SECRET_KEY= "<Your JWT Secret Key>"
MONGO="<MONGO Cluster>"

```

1.b) Run the app sever:

```
npm run dev
```

or

```
yarn dev
```

2.a) Client Side

```javascript
VITE_FIREBASE_API_KEY = "<Your Firebase Api Key>";
VITE_FIREBASE_APPID = "<Your Firebase Api ID>";
```

2.b) Run the app locally:

```
npm run dev
```

or

```
yarn dev
```

## User

To start using the app sign up, login and start using

## Build

Create a production build:

```
npm run build
```

### Developer

- Developer - Musa Sayar

### İletişim

<p>
<a href="https://www.linkedin.com/in/musasayar/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="musayar9" height="30" width="40" /></a>
<a href="https://medium.com/@musasayar67" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/medium.svg" alt="musayar9" height="30" width="40" /></a>
</p>
