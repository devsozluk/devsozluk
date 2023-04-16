import EmptyLayout from "@/components/Layout/EmptyLayout";
import Header from "@/components/Layout/Header";
import useTabsContent from "@/components/Profile/Profile.tabs";
import supabase from "@/libs/supabase";
import { IProfile } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import linksConstant, { Link } from "@/utils/links";
import { Button, Dropdown, IconButton, Tabs } from "@devsozluk/ui";
import Tippy from "@tippyjs/react";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.params as { username: string };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error && !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile: data,
    },
  };
}

const Profile = ({ profile }: { profile: IProfile }) => {
  return (
    <Fragment>
      <NextSeo
        title={profile.name}
        canonical={"https://dev.devsozluk.net/profile/" + profile.username}
        openGraph={{
          url: "https://dev.devsozluk.net/profile/" + profile.username,
          title: profile.name,
          description: profile.position,
        }}
      />
      <EmptyLayout>
        <Header />
        <div className="pt-56 md:pt-28">
          <div className="flex items-center flex-col ">
            <div className="w-full max-w-2xl px-4">
              <Profile.Header {...profile} />
              <Profile.Tabs {...profile} />
            </div>
          </div>
        </div>
      </EmptyLayout>
    </Fragment>
  );
};

Profile.Header = ({
  username,
  name,
  id,
  avatar_url,
  links,
  position,
}: IProfile) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const host =
    typeof window !== "undefined" ? window.location.origin : undefined;
  const url = `${host}/profile/${username}`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url as string);
    }
  };

  const computedProfileLinks = () => {
    return links?.map((link) => {
      const { label, icon } = linksConstant?.find(
        (item) => item.name === link.name
      ) as Link;

      return {
        label,
        icon,
        url: link.url,
      };
    });
  };

  const goAccountPage = () => {
    router.replace("/dashboard/profile");
  };

  return (
    <div className="flex flex-col md:flex-row  relative justify-between gap-y-4 md:gap-y-0 md:gap-x-6">
      <div className="flex gap-x-4 items-center flex-col md:flex-row gap-y-4 md:gap-y-0">
        <Image
          width={200}
          height={200}
          className="h-52 w-52 md:h-40 md:w-40 rounded-full"
          src={avatar_url}
          alt=""
        />
        <div className="flex flex-col gap-x-8 md:gap-x-6 justify-center items-center md:items-start">
          <h1 className="text-3xl font-semibold text-white">{name}</h1>
          <p className="text-lg text-gray-400">
            {position || "Pozisyon eklenmemiş."}
          </p>
          <div className="flex gap-x-4 mt-4">
            {computedProfileLinks()?.map((link) => (
              <Tippy content={link.label}>
                <a href={link.url} target="_blank" className="text-gray-400">
                  <link.icon className="h-6 w-6" />
                </a>
              </Tippy>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-0 flex gap-x-2">
        {user?.id === id && (
          <Button onClick={goAccountPage} variant="dark" size="sm">
            Profili Düzenle
          </Button>
        )}
        <Dropdown>
          <Dropdown.Button as={IconButton}>
            <HiOutlineDotsHorizontal size={16} />
          </Dropdown.Button>
          <Dropdown.Item onClick={copyToClipboard}>
            <BsLink45Deg />
            profil linkini kopyala
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

Profile.Tabs = (profile: IProfile) => {
  const navigations = useTabsContent(profile);

  return (
    <div className="mt-10">
      <Tabs tabs={navigations} />
    </div>
  );
};

export default Profile;
