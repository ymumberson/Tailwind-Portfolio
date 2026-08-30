"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({
  children,
}: {
  children: string;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img({ src, alt, ...props }) {
          if (typeof src !== "string" || !src) {
            return null;
          }

          let imageSrc = src;

        if (
            src.startsWith("https://github.com/") &&
            src.includes("/blob/")
        ) {
            imageSrc = src
                .replace(
                "https://github.com/",
                "https://media.githubusercontent.com/media/"
                )
                .replace("/blob/", "/");
        }

          return (
            <img
              src={imageSrc}
              alt={alt ?? ""}
              {...props}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}