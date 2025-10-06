import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../service/axiosInstance";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.sub, token });
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // convert to seconds
      return decoded.exp < currentTime;
    } catch (err) {
      return true; // treat invalid token as expired
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const { token } = response;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.sub, token });
      return true;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const { username, email, password } = formData;
      const response = await axiosInstance.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        user,
        isTokenExpired,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
