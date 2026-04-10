import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(null);
  const [userId, setuserId] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("apiUserToken")) {
      setuserLogin(localStorage.getItem("apiUserToken"));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("apiUserToken")) {
      const { user } = jwtDecode(localStorage.getItem("apiUserToken"));
      setuserId(user);
    }
  }, [userLogin]);
  return (
    <AuthContext.Provider value={{ userLogin, setuserLogin,userId }}>
      {children}
    </AuthContext.Provider>
  );
}
