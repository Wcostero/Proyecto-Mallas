// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCDGCF4E2GnUbXZ_A_ihaYrcs88jLgYpfw",
    authDomain: "mallas-san-pablo-db.firebaseapp.com",
    projectId: "mallas-san-pablo-db",
    storageBucket: "mallas-san-pablo-db.appspot.com",
    messagingSenderId: "145572476888",
    appId: "1:145572476888:web:db14fcbde29e141f2da4ad",
    measurementId: "G-3N6Y8F11HL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const auth = getAuth(app);
export{auth};
export default db;



