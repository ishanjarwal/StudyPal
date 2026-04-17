"use client";

import { PDFUploader } from "@/components/chat/PDFUploader";
import { env } from "@/config/env";
import { formatValidationErrorsToHTML } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const NewChatPage = () => {
  const router = useRouter();

  const { getToken } = useAuth();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // send the file to the server
  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    const token = await getToken();
    if (!token) {
      toast.error("Authentication failed");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    const toastId = toast.loading("Uploading PDF...");

    try {
      const response = await fetch(
        env.NEXT_PUBLIC_SERVER_HOST_BASE_URL + "/pdf-upload",
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        if (data.code === "validation_error" && data.errors.length > 0) {
          toast.error(
            <div
              dangerouslySetInnerHTML={{
                __html: formatValidationErrorsToHTML(data.errors),
              }}
            />,
            { id: toastId },
          );
          return;
        }

        if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error("Something went wrong. Please try again later");
        }
      }

      const id = data.id as string;

      toast.success(data.message || "PDF Uploaded Successfully", {
        id: toastId,
      });

      timeoutRef.current = setTimeout(() => {
        router.push(`/dashboard/chat/${id}`);
      }, 1500);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          id: toastId,
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col h-[calc(100vh-10rem)] w-full max-w-5xl mx-auto">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Middle Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4 shadow-sm animate-pulse">
              <Sparkles className="h-3 w-3 mr-2" />
              AI-Powered Learning
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Ready to <span className="text-primary italic">Ace</span> It?
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Transform any PDF into an interactive tutor. Upload below to begin
              your personalized study session.
            </p>
          </div>
          <PDFUploader onFileSelect={handleFileSelect} />
        </div>
      </div>
    </div>
  );
};

export default NewChatPage;
