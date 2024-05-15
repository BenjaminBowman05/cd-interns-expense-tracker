import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiQudxgZyRz9mqFJqlW___8IavgTY5vgk",
  authDomain: "testauth-29d72.firebaseapp.com",
  projectId: "testauth-29d72",
  storageBucket: "testauth-29d72.appspot.com",
  messagingSenderId: "490406618916",
  appId: "1:490406618916:web:7b96e9bd5a462eb770f5b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
