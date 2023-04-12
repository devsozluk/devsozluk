import EmptyLayout from "@/components/Layout/EmptyLayout";
import Header from "@/components/Layout/Header";
import supabase from "@/libs/supabase";
import { IProfile } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import linksConstant, { Link } from "@/utils/links";
import { Dropdown, IconButton, Tabs } from "@devsozluk/ui";
import Tippy from "@tippyjs/react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineLink } from "react-icons/hi2";
import useTabsContent from "./profile.tabs";

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
    <div className="flex items-center flex-col">
      <div className="w-full max-w-2xl">
        <Profile.Header {...profile} />
        <Profile.Tabs {...profile} />
      </div>
    </div>
  );
};

Profile.Header = ({ username, name, avatar_url, links }: IProfile) => {
  const { user } = useAppSelector((state) => state.auth);

  const host =
    typeof window !== "undefined" ? window.location.origin : undefined;
  const url = `${host}/profile/${username}`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url as string);
    }
  };

  const computedProfileLinks = () => {
    return links.map((link) => {
      const { label, icon } = linksConstant.find(
        (item) => item.name === link.name
      ) as Link;

      return {
        label,
        icon,
        url: link.url,
      };
    });
  };

  return (
    <div className="flex justify-between gap-x-6">
      <Image
        width={200}
        height={200}
        className="h-40 w-40 rounded-full"
        src={avatar_url}
        alt=""
      />
      <div className="flex flex-col gap-x-5 justify-center">
        <h1 className="text-3xl font-semibold text-white">{name}</h1>
        <p className="text-lg text-gray-400">Frontend Developer</p>
        <div className="flex gap-x-4 mt-4">
          {computedProfileLinks().map((link) => (
            <Tippy content={link.label}>
              <a href={link.url} target="_blank" className="text-gray-400">
                <link.icon className="h-6 w-6" />
              </a>
            </Tippy>
          ))}
        </div>
      </div>
      <div className="ml-auto">
        <Dropdown>
          <Dropdown.Button as={IconButton}>
            <HiOutlineDotsHorizontal size={16} />
          </Dropdown.Button>
          <Dropdown.Item onClick={copyToClipboard}>
            <HiOutlineLink />
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

Profile.getLayout = (page: React.ReactNode) => {
  return (
    <EmptyLayout>
      <Header />
      <div className="pt-28">{page}</div>
    </EmptyLayout>
  );
};

export default Profile;
