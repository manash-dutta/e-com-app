import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );

    return () => unsubscribe();
  }, [auth]);

  const errorMessage = (error) => {
    const matched = error.message.match(/auth\/([^)\s]+)/);
    return matched ? matched[1].replaceAll("-", " ") : "Something went wrong";
  };

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      console.log("Sign Up succesfull");
    } catch (error) {
      setError(errorMessage(error));
      console.error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      setError(null);
      console.log("Sign In succesfull");
      console.log("User Id", userCredentials.user);
      return true;
    } catch (error) {
      setError(errorMessage(error));
      console.error(error.message);
      return false;
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    console.log("Log out succesfull");
  };

  return (
    <AuthContext.Provider value={{ user, error, setError, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
