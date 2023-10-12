// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR8_OSKLNTdkhkFog1WRX_YbaYkhfjHcg",
  authDomain: "countries-react23k.firebaseapp.com",
  projectId: "countries-react23k",
  storageBucket: "countries-react23k.appspot.com",
  messagingSenderId: "359585318692",
  appId: "11:359585318692:web:b6bfdbfcab67426e0615b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        console.log(err)
        alert(err.message)
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    }
    catch (err) {
        console.log(err)
        alert(err.message)
    }
}

const logout = () => {
    signOut(auth)
}

// const sendPasswordResetEmail = (email) => {
//     return auth
//       .sendPasswordResetEmail(email)
//       .then(() => {
//         console.log('Password reset email sent successfully.');
//       })
//       .catch((error) => {
//         console.error('Error sending password reset email:', error);
//       });
//   };

const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      // The reset email has been sent successfully.
    } catch (error) {
      // Handle errors here, e.g., display an error message to the user.
      console.error("Password reset email not sent: ", error);
      throw error; // You can choose to re-throw the error to handle it elsewhere.
    }
}

// sendPasswordResetEmail(auth, email)
//   .then(() => {
//     // Password reset email sent!
//     // ..
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
  
  

export { auth, db, loginWithEmailAndPassword, logout, registerWithEmailAndPassword, resetPassword };
