import { useAppSelector } from "@/utils/hooks";
import { Fragment } from "react";
import Dropdown from "../Dropdown";
import { Button, IconButton } from "@devsozluk/ui";
import { AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/router";

const Navigations = () => {
  const router = useRouter();
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );

  const goGithubStar = () => {
    window.open("https://github.com/devsozluk/website/stargazers", "_blank");
  };

  const goLoginPage = () => {
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <IconButton
        onClick={goGithubStar}
        className="hidden xl:inline-flex items-center justify-center py-2 !text-xs !text-gray-300 group"
      >
        <AiOutlineStar
          size={15}
          className="text-gray-400 group-hover:text-yellow-400 duration-300 transition-all"
        />
        Github&apos;da bizi destekleyin
      </IconButton>
      {!checkSessionloading &&
        (isLoggedIn ? (
          <Dropdown />
        ) : (
          <Fragment>
            <Button
              onClick={goLoginPage}
              className="text-xs font-normal !px-6"
              size="sm"
              variant="dark"
            >
              Giriş
            </Button>
          </Fragment>
        ))}
    </div>
  );
};

export default Navigations;
