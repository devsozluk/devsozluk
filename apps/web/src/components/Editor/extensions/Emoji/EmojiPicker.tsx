import { FC } from "react";
import EmojiPicker, {
  EmojiStyle,
  SkinTonePickerLocation,
  Theme,
} from "emoji-picker-react";
import { Transition } from "@headlessui/react";
import { ClickAwayListener } from "@devsozluk/ui";

interface EmojiSelectorProps {
  open: boolean;
  onClose: () => void;
  onEmojiClick: (emoji: string, event: MouseEvent) => void;
}

const EmojiSelector: FC<EmojiSelectorProps> = ({
  open,
  onEmojiClick,
  onClose,
}) => {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <Transition show={open} className="z-50 absolute right-0 left-40 top-60">
        <EmojiPicker
          height={400}
          searchPlaceHolder="Emoji Ara"
          theme={Theme.DARK}
          emojiStyle={EmojiStyle.NATIVE}
          skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
          onEmojiClick={(emoji, event) => onEmojiClick(emoji.emoji, event)}
        />
      </Transition>
    </ClickAwayListener>
  );
};

export default EmojiSelector;
