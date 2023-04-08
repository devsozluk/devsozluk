import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface LinksContextType {
  links: { name: string; url: string }[];
  changeLinkUrl: (linkIndex: number, newUrl: string) => void;
  deleteLink: (linkIndex: number) => void;
  newAddLink: () => void;
  changeLinkName: (linkIndex: number, newName: string) => void;
  setLinks: (links: LinksContextType["links"]) => void;
}

export const LinksContext = createContext({} as LinksContextType);

export const LinksProvider = ({ children }: PropsWithChildren) => {
  const [links, setLinks] = useState([] as LinksContextType["links"]);

  const deleteLink = (linkIndex: number) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.splice(linkIndex, 1);
      return newLinks;
    });
  };

  const newAddLink = () => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.push({ name: "website", url: "" });
      return newLinks;
    });
  };

  const changeLinkName = (linkIndex: number, newName: string) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[linkIndex] = { ...newLinks[linkIndex], name: newName };
      return newLinks;
    });
  };

  const changeLinkUrl = (linkIndex: number, newUrl: string) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[linkIndex] = { ...newLinks[linkIndex], url: newUrl };
      return newLinks;
    });
  };

  return (
    <LinksContext.Provider
      value={{
        links,
        setLinks,
        changeLinkUrl,
        deleteLink,
        newAddLink,
        changeLinkName,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export default LinksProvider;

export const useLinksContext = () => {
  return useContext(LinksContext);
};
