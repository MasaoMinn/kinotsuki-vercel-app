"use client";

import React, { useCallback, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { darkTheme, lightTheme, useTheme } from "./ThemeProvider";

interface MarkdownComponentProps {
  content: string;
  className?: string;
  loadingText?: string;
}

export default function MarkdownComponent({
  content,
  className = "prose max-w-none",
  loadingText = "Loading...",
}: MarkdownComponentProps) {
  const { theme, currentTheme } = useTheme();
  const displayContent = content || loadingText;

  const themeConfig =
    theme === "dark"
      ? darkTheme[currentTheme % darkTheme.length]
      : lightTheme[currentTheme % lightTheme.length];

  /* ---------------- CodeBlock ---------------- */

  const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const extractText = useCallback((node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");

      if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
        return extractText(node.props.children);
      }

      return "";
    }, []);

    const handleCopy = useCallback(() => {
      const text = extractText(children);
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }, [children, extractText]);

    return (
      <pre
        className="not-prose relative my-4 overflow-x-auto rounded-xl"
        style={{
          backgroundColor:
            theme === "dark"
              ? "rgba(30, 98, 19, 0.95)"
              : "rgba(172, 206, 231, 0.95)",
          border:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(0,0,0,0.08)",
          boxShadow:
            theme === "dark"
              ? "0 0 0 1px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.4)"
              : "0 0 0 1px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.08)",
          padding: "1rem",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-2 py-1 text-xs transition-opacity duration-200"
          style={{
            backgroundColor:
              theme === "dark"
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.08)",
            color: themeConfig.color,
            cursor: 'pointer',
            opacity: isHovered || copied ? 1 : 0,
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        {children}
      </pre>
    );
  };

  /* ---------------- markdown components ---------------- */

  const components: Components = {
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,

    code: ({ className, children, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className={`rounded px-1.5 py-0.5 font-mono text-sm`}
            style={{
              display: "inline",
              whiteSpace: "nowrap",
              backgroundColor:
                theme === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
              color: themeConfig.color,
            }}
            {...props}
          >
            {children}
          </code>
        );
      }

      // ✅ 代码块中的 code
      return (
        <code
          className={`block font-mono text-sm leading-relaxed ${className}`}
          style={{ color: themeConfig.color }}
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <article className={`${className} ${theme === "dark" ? "prose-invert" : ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {displayContent}
      </ReactMarkdown>
    </article>
  );
}