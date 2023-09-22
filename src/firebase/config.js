
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIh8NI57eOYw01K5zlABfSmBBhk7CbcNc",
  authDomain: "coderhouse-react-47175.firebaseapp.com",
  projectId: "coderhouse-react-47175",
  storageBucket: "coderhouse-react-47175.appspot.com",
  messagingSenderId: "1096480240780",
  appId: "1:1096480240780:web:4fdd363c0f5c62113db7a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initfireBase = () => app