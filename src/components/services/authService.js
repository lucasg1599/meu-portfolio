import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import api from "./api";

export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        token,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      const response = await api.get("/private/users/getLoggedUser");

      if (response.status === 200) {
        userData.loggedInUserDetails = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        return {
          success: true,
          message:<p>{t("login.successLogin")}</p>,
          userData,
        };
      } else {
        localStorage.removeItem("user");
        return { success: false, message: "Credenciais inválidas." };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: "Credenciais inválidas." };
    }
  };