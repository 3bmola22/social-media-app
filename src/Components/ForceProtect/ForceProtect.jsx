import { Home } from "iconsax-reactjs";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ForceProtect({ children }) {
  if (localStorage.getItem("apiUserToken") === null) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/home"} />;
  }
}
