"use client";

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
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const recentChats = [
  { id: "1", title: "Quantum Physics Notes" },
  { id: "2", title: "Modern Art History" },
  { id: "3", title: "Calculus III Review" },
  { id: "4", title: "Biology Chapter 5" },
  { id: "5", title: "World War II Summary" },
  { id: "6", title: "Discrete Math Quiz" },
  { id: "7", title: "English Literature" },
  { id: "8", title: "Chemistry Lab Prep" },
  { id: "9", title: "Macroeconomics" },
  { id: "10", title: "Neural Networks" },
];

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
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
              {recentChats.map((chat) => (
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
                      <span className="truncate text-sm">{chat.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover className="hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Chat Options</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-border/50">
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-2 py-2.5">
                        <Trash2 className="h-4 w-4" />
                        <span className="font-medium">Delete Chat</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
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
  );
}
