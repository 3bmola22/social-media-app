import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import CounterContextProvider from "./Context/CounterContext";
import { HeroUIProvider } from "@heroui/react";
import Profile from "./Components/Profile/Profile";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ForceProtect from "./Components/ForceProtect/ForceProtect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./Components/PostDetails/PostDetails";
import { Bounce, toast, ToastContainer } from "react-toastify";
import CheckOnline from "./Components/CheckOnline/CheckOnline";
import { useNetworkState } from "react-use";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ForceProtect>
            <Register />
          </ForceProtect>
        ),
      },
      {
        path: "register",
        element: (
          <ForceProtect>
            <Register />
          </ForceProtect>
        ),
      },
      {
        path: "login",
        element: (
          <ForceProtect>
            <Login />
          </ForceProtect>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "postdetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();
export default function App() {
  const { online } = useNetworkState();

  return (
    <>
      {!online && <CheckOnline />}
      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <HeroUIProvider>
            <CounterContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer />
            </CounterContextProvider>
          </HeroUIProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
