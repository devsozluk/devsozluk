import Layout from "@/components/Layout";
import MainLayout from "@/components/Layout/MainLayout";
import EmailVerification from "@/pages/Auth/EmailVerification";
import Login from "@/pages/Auth/Login";
import Redirect from "@/pages/Auth/Redirect";
import Register from "@/pages/Auth/Register";
import CreateTopic from "@/pages/CreateTopic";
import NotFound from "@/pages/Errors/NotFound";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Topic from "@/pages/Topic";
import { useAppSelector } from "@/utils/hooks";
import { createBrowserRouter, Navigate } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/konu/:slug",
        element: <Topic />,
      },
    ],
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "uyelik/giris",
        element: (
          <GuestOnly>
            <Login />
          </GuestOnly>
        ),
      },
      {
        path: "uyelik/kayit",
        element: (
          <GuestOnly>
            <Register />
          </GuestOnly>
        ),
      },
      {
        path: "uyelik/email-dogrula",
        element: (
          <GuestOnly>
            <EmailVerification />
          </GuestOnly>
        ),
      },
      {
        path: "uyelik/dogrulama",
        element: <Redirect />,
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
        path: "/panel/konu-olustur",
        element: (
          <AuthOnly>
            <CreateTopic />
          </AuthOnly>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function AuthOnly({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/uyelik/giris" />;
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
