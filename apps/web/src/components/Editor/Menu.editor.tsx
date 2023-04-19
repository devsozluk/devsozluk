import { Button, IconButton, Input } from "@devsozluk/ui";
import type { Editor } from "@tiptap/react";
import { Fragment, useState } from "react";
import { BiBold, BiItalic } from "react-icons/bi";
import { TbLink, TbLinkOff } from "react-icons/tb";
import { CiCircleAlert } from "react-icons/ci";
import { IoMdCode } from "react-icons/io";
import { MdCodeOff } from "react-icons/md";
import { Transition } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";

const MenuBar = ({ editor }: { editor: any }) => {
  const [isOpenLinkModal, setIsOpenLinkModal] = useState(false);

  if (!editor) {
    return null;
  }

  const handleOpenLinkModal = () => {
    setIsOpenLinkModal(true);
  };

  return (
    <Fragment>
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <BiBold size={20} />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <BiItalic size={20} />
      </IconButton>
      <IconButton
        onClick={handleOpenLinkModal}
        disabled={editor.isActive("link")}
      >
        <TbLink size={20} />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus()?.unsetLink()?.run()}
        disabled={!editor.isActive("link")}
      >
        <TbLinkOff size={20} />
      </IconButton>
      <IconButton
        onClick={() => editor.chain()?.setSpoiler()?.run()}
        disabled={editor.isActive("spoiler")}
      >
        <CiCircleAlert size={20} />
      </IconButton>
      {!editor.isActive("code") ? (
        <IconButton
          onClick={() => editor.chain().focus()?.setCodeBlock()?.run()}
          disabled={!editor.can().chain().focus().setCodeBlock().run()}
        >
          <IoMdCode size={20} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => editor.chain().focus()?.unsetCode()?.run()}
          disabled={!editor.can().chain().focus()?.unsetCode()?.run()}
        >
          <MdCodeOff size={20} />
        </IconButton>
      )}
      <MenuBar.LinkModal
        editor={editor}
        isOpenLinkModal={isOpenLinkModal}
        setIsOpenLinkModal={setIsOpenLinkModal}
      />
    </Fragment>
  );
};

MenuBar.LinkModal = ({
  editor,
  isOpenLinkModal,
  setIsOpenLinkModal,
}: {
  editor: Editor;
  isOpenLinkModal: boolean;
  setIsOpenLinkModal: (isOpen: boolean) => void;
}) => {
  const [link, setLink] = useState("");

  const handleUpdateLink = () => {
    if (!link) {
      return toast.error("Link yazmalısınız.");
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: link })
      .run();
    setIsOpenLinkModal(false);
    setLink("");
  };

  const handleCloseModal = () => {
    setIsOpenLinkModal(false);
  };

  const { from, to, empty } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, " ");

  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      show={isOpenLinkModal}
      className="absolute z-20 w-72 rounded-md shadow-xl bg-gray-800"
    >
      <div
        tabIndex={0}
        className="flex items-center cursor-pointer p-3 flex-col text-sm rounded-md truncate transition-colors duration-300 transform text-gray-300 hover:text-white"
      >
        <div className="flex items-center justify-between w-full">
          <h3>Link Ekle</h3>
          <IconButton onClick={handleCloseModal}>
            <CgClose size={18} />
          </IconButton>
        </div>
        <div className="flex flex-col w-full">
          <Input
            placeholder="Text"
            value={selectedText}
            className="h-9 !rounded"
          />
          <Input
            placeholder="Link"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            className="h-9 !rounded"
          />
        </div>
        <Button onClick={handleUpdateLink} className="mt-1" size="md">
          Ekle
        </Button>
      </div>
    </Transition>
  );
};

export default MenuBar;
