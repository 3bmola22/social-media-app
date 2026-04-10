// import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "./../Login/Login";

export default function ProtectedRoute({ children }) {
  //   const { setuserLogin, userLogin } = useContext(AuthContext);

  //   console.log(userLogin);

  if (localStorage.getItem("apiUserToken") === null) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
}
