import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAcjzla1ec0orgE7jiJ8L0zvPUMJIgTqZY",
    authDomain: "tml-9ba2d.firebaseapp.com",
    projectId: "tml-9ba2d",
    storageBucket: "tml-9ba2d.firebasestorage.app",
    messagingSenderId: "1050104588068",
    appId: "1:1050104588068:web:de07e50a3bea3386dab5b1",
    measurementId: "G-40VVCM0RG1"
  };

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
