import { ITopic } from "@/types";
import { Dropdown, IconButton } from "@devsozluk/ui";
import React, { PropsWithChildren } from "react";
import { BsTwitter } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { HiOutlineLink } from "react-icons/hi";
import { TwitterShareButton } from "react-share";

const SocialShare = ({ title, slug }: ITopic) => {
  const host =
    typeof window !== "undefined" ? window.location.origin : undefined;
  const url = `${host}/topic/${slug}`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url as string);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Button as={IconButton}>
        <FiShare size={16} />
      </Dropdown.Button>
      <Dropdown.Item>
        <TwitterShareButton
          className="w-full flex gap-x-2 items-center"
          url={url as string}
          title={title}
        >
          <BsTwitter />
          twitter da paylaş
        </TwitterShareButton>
      </Dropdown.Item>
      <Dropdown.Item onClick={copyToClipboard}>
        <HiOutlineLink />
        linki kopyala
      </Dropdown.Item>
    </Dropdown>
  );
};

export type ItemProps = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

SocialShare.Item = ({ children, onClick }: ItemProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 w-full rounded flex gap-x-2 items-center hover:bg-gray-600 hover:text-white"
    >
      {children}
    </button>
  );
};

export default SocialShare;
