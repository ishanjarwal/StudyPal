"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp, FileText, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PDFUploader({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        toast.error("Only PDF files are allowed!");
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group cursor-pointer w-full max-w-xl mx-auto aspect-16/10 rounded-[2.5rem] border-2 border-dashed transition-all duration-500 overflow-hidden flex flex-col items-center justify-center gap-6 p-8",
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02] shadow-2xl shadow-primary/10"
          : "border-border bg-card/30 hover:border-primary/50 hover:bg-accent/5 hover:shadow-xl shadow-sm",
      )}
    >
      {/* Dynamic Background */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-accent/5 transition-opacity duration-700",
          isHovered || isDragActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Upload Icon/Pulse */}
      <div className="relative z-10">
        <div
          className={cn(
            "h-20 w-20 rounded-3xl flex items-center justify-center transition-all duration-500",
            isDragActive
              ? "bg-primary text-primary-foreground rotate-12 scale-110"
              : "bg-primary/10 text-primary",
          )}
        >
          <FileUp
            className={cn(
              "h-10 w-10 transition-transform duration-500",
              isHovered && !isDragActive && "translate-y-[-4px]",
            )}
          />
        </div>

        {/* Decorative Sparkles */}
        <Sparkles
          className={cn(
            "absolute -top-2 -right-2 h-6 w-6 text-primary transition-all duration-500",
            isHovered || isDragActive
              ? "opacity-100 scale-100 rotate-12"
              : "opacity-0 scale-50",
          )}
        />
      </div>

      <div className="relative z-10 text-center space-y-2">
        <h3 className="text-2xl font-bold tracking-tight">
          {isDragActive ? "Drop your PDF here" : "Upload your study material"}
        </h3>
        <p className="text-muted-foreground max-w-[280px] mx-auto text-sm leading-relaxed">
          Drag & drop your PDF file here, or click to browse. Max size 50MB.
        </p>
      </div>

      <input {...getInputProps()} />

      {/* Bottom Label */}
      <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-primary transition-colors">
        <FileText className="h-3 w-3" />
        PDF ONLY
      </div>
    </div>
  );
}
