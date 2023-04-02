import { ITopic } from "@/types";
import { IconButton } from "@devsozluk/ui";
import { Menu, Transition } from "@headlessui/react";
import React, { PropsWithChildren } from "react";
import { BsTwitter } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { HiClipboardCopy } from "react-icons/hi";
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
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as={IconButton}>
        <FiShare size={16} />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute"
      >
        <Menu.Items className="absolute -right-10 mt-2 w-56 rounded shadow bg-gray-700 text-sm text-gray-200 font-normal">
          <Menu.Item>
            <TwitterShareButton
              className="w-full"
              url={url as string}
              title={title}
            >
              <SocialShare.Item>
                <BsTwitter />
                twitter da paylaş
              </SocialShare.Item>
            </TwitterShareButton>
          </Menu.Item>
          <Menu.Item>
            <SocialShare.Item onClick={copyToClipboard}>
              <HiClipboardCopy />
              linki kopyala
            </SocialShare.Item>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
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
