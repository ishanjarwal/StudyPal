"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface AssistantMessageProps {
  content: string;
}

export const AssistantMessage = ({ content }: AssistantMessageProps) => {
  return (
    <div className="flex w-full justify-start mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex gap-4 max-w-full">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="prose prose-zinc dark:prose-invert max-w-none prose-sm md:prose-base prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="rounded-lg overflow-hidden my-4 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                      <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                        <span className="text-xs font-mono text-zinc-500">{match[1]}</span>
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="!m-0 !bg-zinc-900"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className={cn(
                        "bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 font-mono font-medium text-primary",
                        className
                      )}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => <p className="mb-4 last:mb-0 text-zinc-700 dark:text-zinc-300 leading-7">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-700 dark:text-zinc-300">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-700 dark:text-zinc-300">{children}</ol>,
                li: ({ children }) => <li className="leading-7">{children}</li>,
                h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 text-zinc-900 dark:text-zinc-100">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 text-zinc-900 dark:text-zinc-100">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 text-zinc-900 dark:text-zinc-100">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/30 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 text-left text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-100 dark:border-zinc-800">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
