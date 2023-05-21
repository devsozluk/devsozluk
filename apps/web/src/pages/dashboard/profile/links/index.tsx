import {
  useGetUserLinksQuery,
  useUpdateUserLinksMutation,
} from "@/services/user";
import linksConstants, { Link } from "@/utils/links";
import { Button, IconButton, Input } from "@devsozluk/ui";
import { Listbox } from "@headlessui/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { HiChevronUpDown, HiTrash } from "react-icons/hi2";
import { LinksProvider, useLinksContext } from "./links.context";
import LinksSkeleton from "./links.skeleton";

const ProfileLinks = () => {
  return (
    <LinksProvider>
      <div className="flex flex-col gap-y-2 pt-6">
        <div>
          <h3 className="text-lg font-semibold">Bağlantılar</h3>
          <p className="text-sm text-gray-400">
            Profilinize ekleyebileceğiniz bağlantılar
          </p>
        </div>
        <ProfileLinks.Content />
      </div>
    </LinksProvider>
  );
};

ProfileLinks.Content = () => {
  const { links, setLinks, newAddLink } = useLinksContext();
  const { data, isLoading } = useGetUserLinksQuery("");
  const [updateLinks, { isLoading: updateLoading, status }] =
    useUpdateUserLinksMutation();

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  const handleUpdateLinks = async () => {
    updateLinks({ links });
  };

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Bağlantılar güncellendi");
    }
  }, [status]);

  if (isLoading) return <LinksSkeleton />;
  else
    return (
      <div>
        {links.map((link, index) => (
          <ProfileLinks.Item key={index} {...link} index={index} />
        ))}
        <div className="flex flex-col gap-y-3">
          <Button onClick={newAddLink} size="sm" variant="dark">
            Ekle
          </Button>
          <Button
            disabled={updateLoading}
            loading={updateLoading}
            onClick={handleUpdateLinks}
            size="sm"
          >
            Güncelle
          </Button>
        </div>
      </div>
    );
};

export interface ProfileLink {
  name: string;
  url: string;
  index: number;
}

ProfileLinks.Item = ({ index, name, url }: ProfileLink) => {
  const { deleteLink, changeLinkName, changeLinkUrl } = useLinksContext();

  const handleDeleteLink = () => {
    deleteLink(index);
  };

  const handleSelectLink = (link: any) => {
    changeLinkName(index, link.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLinkUrl(index, e.target.value);
  };

  const computedLink = linksConstants.find(
    (link) => link.name === name
  ) as Link;

  return (
    <div className="flex items-center gap-x-2">
      <div className="relative">
        <Listbox
          as="div"
          className="rounded-lg shadow w-14 bg-gray-700"
          onChange={handleSelectLink}
          value={name}
        >
          <Listbox.Button>
            <div className="relative items-center justify-between w-full h-8 pl-3 flex pr-10 text-left cursor-default focus:outline-none sm:text-sm text-gray-300">
              <span className="flex truncate w-4 h-4">
                <computedLink.icon />
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                <HiChevronUpDown
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Listbox.Button>
          <Listbox.Options className="z-50 my-2 flex flex-col p-2 absolute text-sm text-gray-200 bg-gray-700 overflow-y-scroll max-h-28">
            {linksConstants.map((link) => (
              <Listbox.Option
                className="flex cursor-pointer rounded gap-x-2 py-2 px-2 items-center w-full text-sm text-gray-300 hover:bg-black/20 hover:text-white"
                key={link.name}
                value={link}
              >
                <link.icon />
                {link.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <Input
        value={url}
        onChange={handleInputChange}
        className="h-8 !rounded-md"
        placeholder="https://example.com"
      />
      <div>
        <IconButton onClick={handleDeleteLink} className="w-8 ">
          <HiTrash size={16} />
        </IconButton>
      </div>
    </div>
  );
};

export default ProfileLinks;
