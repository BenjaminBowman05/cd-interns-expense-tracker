import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const signUpFireBase = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up
    const user = userCredential.user;
    return user; // Resolve with user
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    return null;
  }
};

  export default signUpFireBase;