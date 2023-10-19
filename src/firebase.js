// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAot9FusK9cgAikqrZrUVpg55RNLUI79Jk",
  authDomain: "reactchatapp-1bc36.firebaseapp.com",
  projectId: "reactchatapp-1bc36",
  databaseURL: "https://reactchatapp-1bc36.firebaseio.com",
  storageBucket: "reactchatapp-1bc36.appspot.com",
  messagingSenderId: "705189158557",
  appId: "1:705189158557:web:c8d7d05d3bd88f70dc7e74",
  measurementId: "G-VF2QQ8W41N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { storage };

export default app;
export { auth, db };


