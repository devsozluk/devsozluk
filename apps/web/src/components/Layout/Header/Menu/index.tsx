import { useAppSelector } from "@/utils/hooks";
import { Fragment } from "react";
import Dropdown from "../Dropdown";
import { Button, IconButton } from "@devsozluk/ui";
import { AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/router";

const Menu = () => {
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );

  return (
    <Fragment>
      {!checkSessionloading &&
        (isLoggedIn ? <Dropdown /> : <Menu.Navigations />)}
    </Fragment>
  );
};

const Navigations = () => {
  const router = useRouter();

  const goGithubStar = () => {
    window.open("https://github.com/devsozluk/website/stargazers", "_blank");
  };

  const goLoginPage = () => {
    router.push("/auth/login");
  };

  return (
    <div className="flex space-x-4">
      <IconButton
        onClick={goGithubStar}
        className="hidden md:flex items-center justify-center !text-xs !text-gray-300 group"
      >
        <AiOutlineStar
          size={15}
          className="text-gray-400 group-hover:text-yellow-400 duration-300 transition-all"
        />
        Github'da bizi destekleyin
      </IconButton>
      <Button
        onClick={goLoginPage}
        className="text-xs font-normal !px-6"
        size="sm"
        variant="dark"
      >
        Giriş
      </Button>
    </div>
  );
};

Menu.Navigations = Navigations;

export default Menu;
