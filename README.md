# React Chat App

This is a simple chat application built using React. It allows users to sign up, log in, and chat with other users. The app also provides a user profile section where you can upload a profile picture.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [File Structure](#file-structure)
4. [Dependencies](#dependencies)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- User registration and authentication
- Real-time chat functionality
- User profile customization
- Attachment support for sending images and files
- Loading indicators while fetching data
- Private routing for authenticated users
- Firebase integration for real-time updates
- Responsive design for various screen sizes

## Getting Started

To get started with this chat application, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/SaifuddinSaifee/react_chat_app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd react-chat-app
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Edit the a `firebase.js` file to set up your Firebase configuration in `firebase.js`.

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "YOUR_PROJECT_ID",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { storage };

export default app;
export { auth, db };
```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## File Structure

Here's the high-level structure of the project:

```
src/
  ├── components/
  |    ├── Attachment.jsx
  |    ├── Loading.jsx
  |    ├── Message.jsx
  |    ├── MessageForm.jsx
  |    ├── Navbar.jsx
  |    ├── PrivateRoute.jsx
  |    ├── UploadDp.jsx
  |    └── User.jsx
  ├── context/
  |    └── auth.jsx
  ├── images/
  ├── pages/
  |    ├── Home.jsx
  |    ├── Login.jsx
  |    ├── Profile.jsx
  |    └── Register.jsx
  ├── App.css
  ├── App.jsx
  ├── App.test.js
  ├── firebase.js
  ├── index.css
  ├── index.js
  └── logo.svg
```

- The `components` directory contains various React components used in the application, such as message display, message form, navigation bar, and more.

- The `context` directory contains the authentication context used for user authentication and authorization.

- The `images` directory can store any images or files used within the application.

- The `pages` directory contains the main pages of the application, including the home page, login page, profile page, and registration page.

- `App.css` and `index.css` contain the application's styles.

- `App.jsx` is the root component of the application and serves as the entry point.

- `firebase.js` is used for Firebase configuration and integration.

- `index.js` is the main entry point for the React application.

- `logo.svg` is the logo for the application.

## Dependencies

This project uses the following major dependencies:

- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/): Backend services and real-time database.
- [React Router](https://reactrouter.com/): Routing for single-page applications.

To view the complete list of dependencies and their versions, check the `package.json` file in the project's root directory.

1. firebase (v10.5.0) - Firebase is a comprehensive platform for building web and mobile applications. In this project, Firebase is used for real-time data storage and management, user authentication, and as a backend service.

2. moment (v2.29.4) - A JavaScript library for parsing, formatting, and manipulating dates and times. It is used for handling date and time-related functionality in the application.

3. react (v18.2.0) - The core library for building user interfaces in the application, providing the foundational structure for all components.

4. react-dom (v18.2.0) - This package is essential for rendering React components in the DOM (Document Object Model) and updating the user interface.

5. react-moment (v1.1.3) - A wrapper around the Moment.js library, used for rendering and formatting dates and times within React components.

6. react-router-dom (v6.17.0) - This library enables client-side routing for a single-page application, ensuring that the user interface remains in sync with the URL.

7. react-scripts (v5.0.1) - A set of scripts and configurations for bootstrapping and managing a React application. It includes essential build and development tools.



## Usage

Once you have the application up and running, you can register a new account, log in, and start chatting with other users. You can also customize your profile by uploading a profile picture.