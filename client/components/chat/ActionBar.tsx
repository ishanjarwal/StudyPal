"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";

const ActionBar = ({
  value,
  setValue,
  fileName,
  handleSendMessage,
}: {
  value: string;
  setValue: (val: string) => void;
  fileName: string;
  handleSendMessage: () => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="
        relative flex items-end w-full max-w-2xl min-h-[56px] rounded-4xl border transition-all duration-300 shadow-lg group focus-within:ring-4 focus-within:ring-primary/10 border-primary/30 bg-background/80"
    >
      {/* User Input Textarea */}
      <textarea
        placeholder={`Ask about ${fileName}...`}
        className="flex-1 bg-transparent border-none outline-none resize-none py-[18px] px-4 min-h-[56px] text-base placeholder:text-muted-foreground/60 focus:ring-0 overflow-hidden font-medium"
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Send Button */}
      <div className="pr-4 pb-2">
        <Button
          size="icon"
          disabled={!value.trim()}
          onClick={handleSendMessage}
          className={cn(
            "h-10 w-10 rounded-full transition-all duration-500 shadow-md",
            value.trim()
              ? "bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/20"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed",
          )}
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ActionBar;
