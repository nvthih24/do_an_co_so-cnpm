import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    console.log("Gọi login trong AuthContext với user:", user); 
    setCurrentUser(user); // Cập nhật thông tin người dùng sau khi đăng nhập
  };

  const logout = () => {
    setCurrentUser(null); // Đăng xuất người dùng
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
