"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function Markdown({
  children,
}: {
  children: string;
}) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            skipHtml
            components={{
                img({ src, alt }) {
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
                    />
                );
                },
            }}
            >
                {children}
        </ReactMarkdown>
    </div>
  );
}