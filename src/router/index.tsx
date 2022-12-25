import AuthLayout from "@/components/Layouts/AuthLayout";
import Layout from "@/components/Layouts/MainLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import CreateTopic from "@/pages/CreateTopic";
import Home from "@/pages/Home/";
import Profile from "@/pages/Profile";
import Topic from "@/pages/Topic";
import { useAppSelector } from "@/utils/hooks";
import { createBrowserRouter, Navigate } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "konu/:slug",
        element: <Topic />,
      },
      {
        path: "/panel/profil",
        element: (
          <AuthOnly>
            <Profile />
          </AuthOnly>
        ),
      },
      {
        path: "panel/konu-olustur",
        element: (
          <AuthOnly>
            <CreateTopic />
          </AuthOnly>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "giris",
        element: (
          <GuestOnly>
            <Login />
          </GuestOnly>
        ),
      },
      {
        path: "kayit",
        element: (
          <GuestOnly>
            <Register />
          </GuestOnly>
        ),
      },
    ],
  },
]);

function AuthOnly({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/giris" />;
  }

  return children;
}

function GuestOnly({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
