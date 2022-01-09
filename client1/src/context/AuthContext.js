import React, { useState, useContext, useEffect } from "react";
import { AUTH_TOKEN } from "../constants/constants";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token !== null;
  });

  const login = () => {
    setAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      setAuthenticated(true);
    } else if (token === null) {
      setAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
