// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState( localStorage.getItem("token") || null);

  const login = async (email, password) => {
    const response = await axios.post("https://electron-recipe.onrender.com/login", {
      email,
      password,
    });
    setAuth(response.data.token);
    localStorage.setItem("token", response.data.token);
  };

  const signup = async (name, email, password) => {
    await axios
      .post("https://electron-recipe.onrender.com/signup", { name, email, password })
      .then((response) => {
        setAuth(response.data.token);
        localStorage.setItem("token", response.data.token);
      });
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
