// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPj7Cn3drhK4WTe3AeWhCHJ4aosCqJZtA",
  authDomain: "fir-bc005.firebaseapp.com",
  databaseURL: "https://fir-bc005-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-bc005",
  storageBucket: "fir-bc005.appspot.com",
  messagingSenderId: "19095597907",
  appId: "1:19095597907:web:cd2744392fe2bc8a7a67a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;