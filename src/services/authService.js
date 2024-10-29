import { auth } from "../firebaseConfig"

const registerUser = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const loginUser = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const logoutUser = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export { registerUser, loginUser, logoutUser };