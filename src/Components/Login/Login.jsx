import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

const schema = zod.object({
  // name: zod
  //   .string("required name")
  //   .min(3, "less 3")
  //   .max(7, "more 7")
  //   .nonempty("invalid name"),
  email: zod
    .email("required Email")
    .nonempty("invalid email")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "look like email",
    ),

  password: zod
    .string("required pass")
    .nonempty("pass required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "look like pass",
    ),

  // rePassword: zod.string().nonempty("rePass required"),
  // dateOfBirth: zod.string().refine((date) => {
  //   let userDate = new Date(date);
  //   let currentDate = new Date();
  //   return currentDate - userDate >= 18;
  // }, "less 18 year"),
  // dateOfBirth: zod.coerce
  //   .date()
  //   .refine((dateValue) => {
  //     let userDate = dateValue.getFullYear();
  //     let currentDate = new Date().getFullYear();
  //     return currentDate - userDate >= 18;
  //   }, "date not match 18")
  //   .transform((date) => {
  //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
  //   }),
  // gender: zod.enum(["male", "female"]),
});
// .refine(
//   (object) => {
//     return object.password == object.rePassword;
//   },
//   { error: "Pass not match", path: ["rePassword"] },
// );
export default function Login() {
  let navigate = useNavigate();
  const [apiErr, setapiErr] = useState(null);
  const [loading, setloading] = useState(false);
  const { setuserLogin, userLogin } = useContext(AuthContext);

  const form = useForm({
    defaultValues: {
      // name: "",
      email: "",
      password: "",
      // rePassword: "",
      // dateOfBirth: "",
      // gender: "",
    },
    resolver: zodResolver(schema),

    mode: "onChange",
  });
  const { register, handleSubmit, setError, getValues, watch, formState } =
    form;
  // console.log();

  //   const { name, onBlur, onChange, ref } = register("name");
  //   console.log(register("name"));
  function handleLogin(obj) {
    setloading(true);
    console.log(obj);
    axios
      .post("https://route-posts.routemisr.com/users/signin", obj)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.message === "signed in successfully") {
          localStorage.setItem("apiUserToken", res.data.data.token);
          setuserLogin(res.data.data.token);

          // navigate("/login");
          navigate("/home");
          // goToRegister();
          console.log("signed in successfully", userLogin);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setapiErr(err.response.data.message);
      })
      .finally(() => setloading(false));
  }
  function goToRegister() {
    navigate("/");
  }
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          <span className={loading ? `text-blue-300` : `text-blue-700`}>
            Hello
          </span>{" "}
          Login{" "}
          <span className={loading ? `text-blue-300` : `text-blue-700`}>
            Now
          </span>
        </h1>
        {apiErr && (
          <>
            <p className="bg-red-600 font-bold p-2 my-3 rounded-lg text-white w-100 m-auto">
              {apiErr}
            </p>
          </>
        )}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="max-w-md mx-auto my-5  "
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              {...register(
                "email",
                //    {
                //   required: { value: true, message: "email" },
                //   pattern: {
                //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                //     message: "invalid email",
                //   },
                // }
              )}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute start-[5px] top-[5px] text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Type your e-mail
            </label>
            {formState.errors.email && formState.touchedFields.email && (
              <p className="text-yellow-600 p-2 font-bold my-2 rounded-sm border border-2 ">
                {formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              {...register(
                "password",
                //    {
                //   required: { value: true, message: "Password" },
                //   pattern: {
                //     value:
                //       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,

                //     message: "invalid Pass",
                //   },
                // }
              )}
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute start-[5px] top-[5px] text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Type your password
            </label>
            {formState.errors.password && formState.touchedFields.password && (
              <p className="text-yellow-600 p-2 font-bold my-2 rounded-sm border border-2 ">
                {formState.errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-brand bg-blue-600  rounded-lg w-full  box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xl
 px-4 py-3 focus:outline-none hover:bg-blue-900 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Loading ..." : "Login"}
          </button>{" "}
          {apiErr === "incorrect email or password" && (
            <button
              onClick={() => goToRegister()}
              className="my-2 bg-brand bg-blue-600  text-white hover:text-white rounded-lg w-full  box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xl
 px-4 py-3 focus:outline-none hover:bg-blue-900 cursor-pointer w-.5"
            >
              Didnt have acount? Register Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
