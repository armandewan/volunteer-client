import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config.js";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // registration auth
  const registrationUser = (name, email, password, photo) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        const user = currentUser.user;        
        createJWT(user.email)
        setUser(user);
        setError(null);
        setLoading(false);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // login auth
  const loginUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        const user = currentUser.user;
        setUser(user);
        createJWT(user.email)
        setError(null);
        setLoading(false);
        toast.success("Login Successful!");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  //create jwt
  const createJWT = (email) => {
    fetch(`${import.meta.env.VITE_HOST}/createJWT`, {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token)
      });
  };
  //   google login
  const googleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        createJWT(result.user.email)
        setError(null);
        setLoading(false);
        toast.success("Login Successful!");
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  // logout
  const logoutUser = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem('token')
    });
  };

  //   observer set
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const info = {
    registrationUser,
    loginUser,
    user,
    googleLogin,
    logoutUser,
    error,
    loading,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
