import links from "@/utils/links";
import { Button, IconButton, Input } from "@devsozluk/ui";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { HiChevronUpDown, HiTrash } from "react-icons/hi2";


const Links = () => {
  const [userLinks, setLinks] = useState([{
    name: "github",
    url: "https://github.com/osmandlsmn"
  }])

  const handleNewLink = () => {
    setLinks((prevLinks) => [...prevLinks, { name: "", url: "" }])
  }

  console.log(userLinks);


  return (
    <div className="flex flex-col gap-y-2 pt-10">
      <div>
        <h3 className="text-lg font-semibold">Bağlantılar</h3>
        <p className="text-sm text-gray-400">Profilinize ekleyebileceğiniz bağlantılar</p>
      </div>
      {userLinks.map((link) => (
        <Links.Item />
      ))}
      <div className="flex flex-col gap-y-3">
        <Button size="sm" variant="dark" onClick={handleNewLink}>Ekle</Button>
        <Button size="sm">Güncelle</Button>
      </div>
    </div>
  )
}

Links.Item = () => {

  const [selected, setSelected] = useState(links[0]);

  const handleSelect = (link: any) => {
    setSelected(link);
  }

  return (
    <div className="flex items-center gap-x-2">
      <div className="relative">
        <Listbox as="div" className="bg-white rounded-lg shadow w-14 dark:bg-gray-700" value={selected} onChange={handleSelect}>
          <Listbox.Button>
            <div className="relative items-center justify-between w-full h-8 pl-3 flex pr-10 text-left cursor-default focus:outline-none sm:text-sm text-gray-300">
              <span className="flex truncate w-4 h-4">{selected.icon}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                <HiChevronUpDown
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Listbox.Button>
          <Listbox.Options tabIndex={0} className="z-50 my-2 flex  flex-col p-2 absolute text-sm text-gray-200 bg-gray-700 overflow-y-scroll max-h-28">
            {links.map((link) => (
              <Listbox.Option className="flex cursor-pointer rounded gap-x-2 py-2 px-2 items-center w-full text-sm text-gray-300 hover:bg-black/20 hover:text-white" key={link.name} value={link}>
                {link.icon}
                {link.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <Input className="h-8 !rounded-md" placeholder="https://example.com" />
      <div>
        <IconButton className="w-8 "><HiTrash size={16} /></IconButton>
      </div>
    </div >
  )
}

export default Links;
