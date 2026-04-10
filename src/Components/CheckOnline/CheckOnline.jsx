import React from "react";
import { Bounce, toast } from "react-toastify";

export default function CheckOnline() {
  return (
    <>
      {toast.error("Check network you are offline now!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })}
    </>
  );
}
