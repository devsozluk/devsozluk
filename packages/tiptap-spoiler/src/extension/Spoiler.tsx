// write basic spoiler tiptap extension for react

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

const SpoilerExtension = Node.create({
  name: "spoiler",
  group: "block",
  content: "block+",
  defining: true,
  parseHTML() {
    return [
      {
        tag: "spoiler",
      },
    ];
  },
});

export default SpoilerExtension;
