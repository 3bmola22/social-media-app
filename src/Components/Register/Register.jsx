import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod
  .object({
    name: zod
      .string("required name")
      .min(3, "less 3")
      .max(7, "more 7")
      .nonempty("invalid name"),
    email: zod
      .email("required Email")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "look like email",
      )
      .nonempty("invalid email"),
    password: zod
      .string("required pass")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "look like pass",
      )
      .nonempty("pass required"),
    rePassword: zod.string().nonempty("rePass required"),
    dateOfBirth: zod.string().refine((date) => {
      let userDate = new Date(date);
      let currentDate = new Date();
      return currentDate - userDate >= 18;
    }, "less 18 year"),
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
    gender: zod.enum(["male", "female"]),
  })
  .refine(
    (object) => {
      return object.password == object.rePassword;
    },
    { error: "Pass not match", path: ["rePassword"] },
  );
export default function Register() {
  let navigate = useNavigate();
  const [registerErr, setregisterErr] = useState(null);
  const [loading, setloading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),

    mode: "onChange",
  });
  const { register, handleSubmit, setError, getValues, watch, formState } =
    form;
  // console.log();

  //   const { name, onBlur, onChange, ref } = register("name");
  //   console.log(register("name"));
  function handleRegister(obj) {
    setloading(true);
    console.log(obj);
    axios
      .post("https://route-posts.routemisr.com/users/signup", obj)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "account created") {
          // navigate("/login");
          goToLogin();
          console.log("account created");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setregisterErr(err.response.data.message);
      })
      .finally(() => setloading(false));
  }
  function goToLogin() {
    navigate("/login");
  }
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          <span className={loading ? `text-blue-300` : `text-blue-700`}>
            Hello
          </span>{" "}
          Register{" "}
          <span className={loading ? `text-blue-300` : `text-blue-700`}>
            Now
          </span>
        </h1>
        {registerErr && (
          <>
            <p className="bg-red-600 font-bold p-2 my-3 rounded-lg text-white w-100 m-auto">
              {registerErr}
            </p>
          </>
        )}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="max-w-md mx-auto my-5  "
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...register(
                "name",
                //    {
                //   required: { value: true, message: "Name" },
                //   minLength: { value: 3, message: "less 3" },
                //   maxLength: { value: 7, message: "more 7" },
                // }
              )}
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute start-[5px] top-[5px] text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Type your name
            </label>
            {formState.errors.name && formState.touchedFields.name && (
              <p className="text-yellow-600 p-2 font-bold my-2 rounded-sm border border-2 ">
                {formState.errors.name.message}
              </p>
            )}
          </div>
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              {...register(
                "rePassword",
                //    {
                //   validate: function (rePassValue) {
                //     if (rePassValue === getValues("password")) {
                //       return true;
                //     } else {
                //       return "Not match";
                //     }
                //   },
                // }
              )}
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="absolute start-[5px] top-[5px] text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Type your password again
            </label>
            {formState.errors.rePassword && (
              <p className="text-yellow-600 p-2 font-bold my-2 rounded-sm border border-2 ">
                {formState.errors.rePassword.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              {...register(
                "dateOfBirth",
                //   {
                //   valueAsDate: true,
                //   validate: function (value) {
                //     const userDate = value.getFullYear();
                //     const currentDate = new Date().getFullYear();
                //     if (currentDate - userDate >= 18) {
                //       return true;
                //     } else {
                //       return "invalid date";
                //     }
                //   },
                // }
              )}
              id="dateOfBirth"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
            />
            <label
              htmlFor="dateOfBirth"
              className="absolute start-[5px] top-[5px] text-md text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter your birthday
              {formState.errors.dateOfBirth &&
                formState.touchedFields.dateOfBirth && (
                  <p className="text-yellow-600 p-2 font-bold my-2 rounded-sm border border-2 ">
                    {formState.errors.dateOfBirth.message}
                  </p>
                )}
            </label>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center mb-4">
              <input
                id="male"
                type="radio"
                {...register(
                  "gender",
                  //   {
                  //   pattern: {
                  //     value: /^(male|female)$/,
                  //     message: "invalid gender",
                  //   },
                  // }
                )}
                defaultValue="male"
                className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
                defaultChecked
              />
              <label
                htmlFor="male"
                className="select-none ms-2 text-sm font-medium text-heading"
              >
                Male
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="female"
                type="radio"
                {...register("gender")}
                defaultValue="female"
                className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
                defaultChecked
              />
              <label
                htmlFor="female"
                className="select-none ms-2 text-sm font-medium text-heading"
              >
                Female
              </label>
              {formState.errors.gender && formState.touchedFields.gender && (
                <p className="text-yellow-600 p-2 font-bold my-2 rounded-sm border border-2 ">
                  {formState.errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-brand bg-blue-700  rounded-lg w-full  box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xl
 px-4 py-3 focus:outline-none hover:bg-blue-900 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Loading ..." : "Register"}
          </button>{" "}
          {registerErr === "user already exists." && (
            <button
              onClick={() => goToLogin()}
              className="my-2 bg-brand bg-blue-700 text-white rounded-lg w-full  box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xl
 px-4 py-3 focus:outline-none hover:bg-blue-900 cursor-pointer w-.5"
            >
              Already have acount? login Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
