"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  MessageSquarePlus,
  Library,
  Sparkles,
  MoreHorizontal,
  Trash2,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useUser, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { toast } from "sonner";

const navItems = [
  {
    title: "New Chat",
    url: "/dashboard",
    icon: MessageSquarePlus,
  },
  {
    title: "Media",
    url: "/dashboard/media",
    icon: Library,
  },
];

interface Chat {
  id: string;
  linkedFileOriginalName: string;
}

export function AppSidebar() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const pathname = usePathname();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchChats = async () => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${env.NEXT_PUBLIC_SERVER_HOST_BASE_URL}/chats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setChats(data.slice(0, 10)); // Show top 10 recent
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
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

    const toastId = toast.loading(`Deleting chat...`);
    try {
      const token = await getToken();
      const response = await fetch(
        `${env.NEXT_PUBLIC_SERVER_HOST_BASE_URL}/chat/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete chat");

      setChats((prev) => prev.filter((chat) => chat.id !== id));
      toast.success("Chat deleted", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat", { id: toastId });
    } finally {
      setChatToDelete(null);
    }
  };

  return (
    <>
      <Sidebar collapsible="offcanvas" className="border-r border-border/50">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 font-black text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="truncate group-data-[collapsible=icon]:hidden">
              StudyPal
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-10 transition-all duration-200 hover:bg-accent/50"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Chats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {loading ? (
                  <div className="flex flex-col gap-2 p-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-full bg-muted animate-pulse rounded-lg"
                      />
                    ))}
                  </div>
                ) : chats.length > 0 ? (
                  chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/dashboard/chat/${chat.id}`}
                        className="h-9 transition-all duration-200 hover:bg-accent/50 group/chat-btn"
                      >
                        <Link
                          href={`/dashboard/chat/${chat.id}`}
                          className="flex items-center gap-3"
                        >
                          <MessageSquare className="h-4 w-4 text-muted-foreground group-hover/chat-btn:text-primary transition-colors" />
                          <span className="truncate text-sm">
                            {chat.linkedFileOriginalName}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction
                            showOnHover
                            className="hover:bg-accent"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Chat Options</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 rounded-xl shadow-xl border-border/50"
                        >
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-2 py-2.5"
                            onClick={() => {
                              setChatToDelete({
                                id: chat.id,
                                name: chat.linkedFileOriginalName,
                              });
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-medium">Delete Chat</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">No chats yet</p>
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-border/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 w-full p-2 rounded-xl transition-all hover:bg-accent/50 group cursor-pointer">
                <div className="flex items-center justify-center shrink-0">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "h-9 w-9 ring-2 ring-primary/10 group-hover:ring-primary/20",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-bold text-foreground/90 truncate leading-tight">
                    {user?.fullName || user?.username || "Study Buddy"}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 truncate mt-0.5">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="rounded-3xl border-border/50 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the chat for{" "}
              <span className="font-bold">"{chatToDelete?.name}"</span>. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
