import { useAuthContext } from "@/context/AuthContext";
import Layout from "@/layouts/default";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import CreateTopic from "@/pages/CreateTopic";
import Home from "@/pages/Home/";
import Profile from "@/pages/Profile";
import Topic from "@/pages/Topic";
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
]);

function AuthOnly({ children }: { children: JSX.Element }) {
  const { user, session } = useAuthContext();

  if (!user || !session) {
    return <Navigate to="/giris" />;
  }

  return children;
}

function GuestOnly({ children }: { children: JSX.Element }) {
  const { user, session } = useAuthContext();

  if (user && session) {
    return <Navigate to="/" />;
  }

  return children;
}
