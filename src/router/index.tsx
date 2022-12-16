import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import Login from "@/pages/Auth/Login/index";
import Register from "@/pages/Auth/Register";

import Home from "@/pages/Home/index";

import DashboardLayout from "@/layouts/dashboard";
import CreateTopic from "@/pages/CreateTopic";

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
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "create-topic",
        element: <CreateTopic />,
      },
    ],
  },
]);
