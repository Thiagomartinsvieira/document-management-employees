import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("userToken", token);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("userToken", token);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("userToken")
    } catch (error) {
        throw new Error(error.message);
    }
};

export { registerUser, loginUser, logoutUser };