import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import Home from "@/pages/Home/index";

import Login from "@/pages/Auth/Login/index";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
