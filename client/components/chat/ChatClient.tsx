"use client";

import { useEffect, useRef, useState } from "react";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";
import ActionBar from "./ActionBar";
import { FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { env } from "@/config/env";

interface Message {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

interface Chat {
  id: string;
  linkedFilename: string;
  linkedFilePath: string;
  linkedFileSize: number;
  isReady: boolean;
  messages: Message[];
}

interface ChatClientProps {
  initialChat: Chat;
}

const ChatClient = ({ initialChat }: ChatClientProps) => {
  const [chat, setChat] = useState<Chat>(initialChat);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages, streamingContent]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessageContent = inputValue;
    setInputValue("");
    setIsLoading(true);
    setStreamingContent(""); // Clear previous streaming content

    // Optimistically add user message
    const userMessage: Message = {
      id: Math.random().toString(),
      role: "USER",
      content: userMessageContent,
      createdAt: new Date().toISOString(),
    };

    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_SERVER_HOST_BASE_URL}/chat/${chat.id}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: userMessageContent }),
        },
      );

      if (!response.ok) throw new Error("Failed to send message");

      // Set up reader for stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let assistantText = "";
      setIsLoading(false); // Stop loading once streaming starts

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6).trim();
            if (dataStr === "[DONE]") break;

            try {
              const data = JSON.parse(dataStr);
              assistantText += data.content;
              setStreamingContent(assistantText);
            } catch (e) {
              console.error("Error parsing stream chunk:", e);
            }
          }
        }
      }

      // Once streaming is done, add the final assistant message to the list
      const finalAssistantMessage: Message = {
        id: Math.random().toString(),
        role: "ASSISTANT",
        content: assistantText,
        createdAt: new Date().toISOString(),
      };

      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, finalAssistantMessage],
      }));
      setStreamingContent(""); // Reset buffer
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] relative bg-background overflow-hidden">
      {/* Header Info Banner */}
      <div className="sticky top-0 z-20 w-full border-b px-6 py-3 flex items-center justify-between bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold truncate max-w-[200px] md:max-w-[400px]">
              {chat.linkedFilename}
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              {(chat.linkedFileSize / (1024 * 1024)).toFixed(2)} MB • PDF
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              chat.isReady ? "bg-green-500 animate-pulse" : "bg-yellow-500",
            )}
          />
          <span className="text-xs font-medium text-muted-foreground">
            {chat.isReady ? "Ready to Chat" : "Processing..."}
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {chat.messages.length === 0 && !streamingContent && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 border border-primary/10">
                <FileText className="w-8 h-8 text-primary/40" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Start asking questions!
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">
                Ask anything about "{chat.linkedFilename}". I can help you
                summarize, explain concepts, or find specific details.
              </p>
            </div>
          )}

          {chat.messages.map((message) =>
            message.role === "USER" ? (
              <UserMessage key={message.id} content={message.content} />
            ) : (
              <AssistantMessage key={message.id} content={message.content} />
            ),
          )}

          {/* Render the streaming content if it exists */}
          {streamingContent && (
            <AssistantMessage
              key="streaming-message"
              content={streamingContent}
            />
          )}

          {isLoading && (
            <div className="flex w-full justify-start mb-8 animate-in fade-in duration-500">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 md:p-8 bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="max-w-3xl mx-auto flex justify-center">
          <ActionBar
            value={inputValue}
            setValue={setInputValue}
            fileName={chat.linkedFilename}
            handleSendMessage={handleSendMessage}
          />
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium opacity-60">
          StudyPal AI can make mistakes. Consider checking important
          information.
        </p>
      </div>
    </div>
  );
};

export default ChatClient;
