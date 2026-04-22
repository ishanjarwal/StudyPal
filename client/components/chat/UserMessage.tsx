"use client";

import { cn } from "@/lib/utils";

interface UserMessageProps {
  content: string;
}

export const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex w-full justify-end mb-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="max-w-[80%] md:max-w-[70%] bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-3 shadow-sm border border-zinc-200 dark:border-zinc-700">
        <p className="text-sm md:text-base text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};
