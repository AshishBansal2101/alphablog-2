import React, { createContext, useState,useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");


  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
    if(token && user){
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, token,setIsLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
