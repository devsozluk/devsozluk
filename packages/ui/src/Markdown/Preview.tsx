import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export const MarkdownPreview: React.FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, inline, className, children, ...props }: any) => (
          <a {...props} className="text-primary items-center flex gap-x-1">
            {children} <AiOutlineLink size={15} />
          </a>
        ),
      }}
      className="closure"
    >
      {content}
    </ReactMarkdown>
  );
};
