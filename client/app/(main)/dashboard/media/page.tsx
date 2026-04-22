"use client";

import { useState, useEffect } from "react";
import {
  Library,
  Sparkles,
  FolderOpen,
  MoreVertical,
  Trash2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { env } from "@/config/env";

interface Chat {
  id: string;
  linkedFileOriginalName: string;
  linkedFileSize: number;
  isReady: boolean;
  createdAt: string;
}

const MediaPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { getToken } = useAuth();

  const fetchChats = async () => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${env.NEXT_PUBLIC_SERVER_HOST_BASE_URL}/chats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch chats");
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load media library");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleDelete = async () => {
    if (!chatToDelete) return;

    const { id, name } = chatToDelete;
    setIsDeleteDialogOpen(false);

    const toastId = toast.loading(`Deleting ${name}...`);
    try {
      const token = await getToken();
      const response = await fetch(
        `${env.NEXT_PUBLIC_SERVER_HOST_BASE_URL}/chat/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to delete chat");

      setChats((prev) => prev.filter((chat) => chat.id !== id));
      toast.success("File deleted successfully", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete file", { id: toastId });
    } finally {
      setChatToDelete(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Media Library
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your uploaded PDFs and study materials.
          </p>
        </div>
        <Button className="rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 w-full sm:w-auto px-6">
          <FolderOpen className="h-4 w-4" />
          Upload New
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[280px] rounded-[2.5rem] border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      ) : chats.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chats.map((chat, i) => (
            <div
              key={chat.id}
              className="group relative rounded-[2.5rem] border border-border bg-card hover:bg-accent/5 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 animate-in fade-in zoom-in-95"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Sparkles className="h-12 w-12 text-muted-foreground/10 absolute -right-4 -bottom-4 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-700" />
                <div className="relative z-10 p-6 bg-background/50 rounded-3xl backdrop-blur-sm border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <FolderOpen className="h-12 w-12 text-primary/40 group-hover:text-primary transition-colors duration-500" />
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate text-foreground/90 group-hover:text-primary transition-colors">
                      {chat.linkedFileOriginalName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-muted text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                        PDF
                      </span>
                      <span className="text-[10px] text-muted-foreground/60 font-medium">
                        {formatFileSize(chat.linkedFileSize)}
                      </span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-xl shrink-0 hover:bg-muted transition-colors"
                      >
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-2xl p-2 min-w-[160px] shadow-2xl border-border/50 backdrop-blur-xl"
                    >
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2 cursor-pointer p-3 rounded-xl transition-colors font-medium"
                        onClick={() => {
                          setChatToDelete({
                            id: chat.id,
                            name: chat.linkedFileOriginalName,
                          });
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete File
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest px-0.5">
                    <span
                      className={
                        chat.isReady ? "text-green-500" : "text-primary/60"
                      }
                    >
                      {chat.isReady ? "Completed" : "Processing"}
                    </span>
                    <span className="text-muted-foreground/40">
                      {chat.isReady ? "100%" : "60%"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden p-0.5 border border-border/50">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        chat.isReady
                          ? "bg-gradient-to-r from-green-400 to-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] w-full"
                          : "bg-gradient-to-r from-primary/40 to-primary/60 w-[60%] animate-shimmer bg-[length:200%_100%]"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    {chat.isReady ? (
                      <div className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        <span className="text-[9px] font-bold text-green-600 uppercase">
                          Ready
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                        <Loader2 className="h-3 w-3 text-primary animate-spin" />
                        <span className="text-[9px] font-bold text-primary uppercase">
                          Analyzing
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground/50">
                    {formatDate(chat.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[3rem] border-2 border-dashed border-border/50 bg-muted/5 p-16 text-center flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 rounded-[2.5rem] bg-muted/10 border border-border/50 shadow-inner">
            <Library className="h-16 w-16 text-muted-foreground/20" />
          </div>
          <div className="space-y-2 max-w-sm">
            <p className="font-bold text-xl">Your library is empty</p>
            <p className="text-sm text-muted-foreground">
              Upload your study materials to start learning with AI. Your PDFs
              and notes will appear here.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-2xl px-8 h-12 font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      )}

      {/* Upgrade Call to Action */}
      <div className="mt-12 group relative rounded-[3rem] border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-10 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="h-32 w-32 text-primary" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold tracking-tight">
              Level up your study game
            </h3>
            <p className="text-muted-foreground max-w-md">
              Upgrade to Studypal Pro for unlimited storage, faster processing,
              and advanced AI insights.
            </p>
          </div>
          <Button className="rounded-[1.5rem] bg-primary hover:bg-primary/90 px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-100">
            Go Unlimited
          </Button>
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="rounded-[2.5rem] p-8 border-border/50 backdrop-blur-xl">
          <AlertDialogHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="h-8 w-8 text-destructive" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-muted-foreground leading-relaxed">
              This will permanently delete{" "}
              <span className="font-bold text-foreground">
                "{chatToDelete?.name}"
              </span>{" "}
              and all its associated chat history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 pt-4">
            <AlertDialogCancel className="rounded-2xl h-12 flex-1 font-bold border-border/50">
              No, keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-2xl h-12 flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold shadow-lg shadow-destructive/20"
            >
              Yes, delete everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MediaPage;
