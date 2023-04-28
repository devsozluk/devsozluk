import { Editor } from "@tiptap/react";
import React, { Fragment, useState } from "react";
import EmojiSelector from "./EmojiPicker";
import { IconButton } from "@devsozluk/ui";
import { BsFillEmojiSmileFill } from "react-icons/bs";

interface InsertEmojiButtonProps {
  editor: Editor | null;
}

const InsertEmojiButton = ({ editor }: InsertEmojiButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    if (isDialogOpen) setIsDialogOpen(false);
    else setIsDialogOpen(true);
  };

  const closeDialog = () => {
    if (!isDialogOpen) return;
    setIsDialogOpen(false);
    editor?.commands.focus();
  };

  const insertEmoji = (emoji: string) => {
    try {
      editor?.commands.insertContent(emoji);
    } catch (error) {
      throw error;
    }
    closeDialog();
  };

  const isDisabled = !editor || !editor.can().insertContent("");

  return (
    <Fragment>
      <IconButton
        onClick={openDialog}
        disabled={isDisabled}
        isActive={isDialogOpen}
      >
        <BsFillEmojiSmileFill />
      </IconButton>
      <EmojiSelector
        open={isDialogOpen}
        onClose={closeDialog}
        onEmojiClick={insertEmoji}
      />
    </Fragment>
  );
};

export default InsertEmojiButton;
