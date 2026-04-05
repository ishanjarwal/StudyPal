"use client";

import { useUser } from "@clerk/nextjs";
import { MessageSquarePlus, Sparkles, FileUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-4">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, <span className="text-primary">{user?.firstName || "there"}</span>! 👋
        </h2>
        <p className="text-muted-foreground text-lg">
          What would you like to study today? Upload a PDF or continue a previous conversation.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <button className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileUp className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <span className="block font-semibold text-lg">Upload PDF</span>
            <span className="text-sm text-muted-foreground">Start a new study session</span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </div>
        </button>

        <button className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquarePlus className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <span className="block font-semibold text-lg">New Chat</span>
            <span className="text-sm text-muted-foreground">Ask anything about your docs</span>
          </div>
        </button>

        <div className="relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border border-border bg-accent/30 overflow-hidden">
          <div className="absolute -right-8 -top-8 h-24 w-24 bg-primary/10 rounded-full blur-3xl" />
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <span className="block font-semibold text-lg">Pro Benefits</span>
            <span className="text-sm text-muted-foreground">Unlimited uploads & GPT-4o</span>
          </div>
          <Button size="sm" variant="secondary" className="mt-2 rounded-xl">
            Upgrade
          </Button>
        </div>
      </div>

      {/* Main Content Area Placeholder */}
      <div className="min-h-[400px] w-full rounded-[2rem] border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/20 relative group overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
        <div className="flex flex-col items-center gap-6 text-center max-w-sm px-6">
          <div className="h-20 w-20 rounded-full bg-border/50 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-muted-foreground/30" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Your Study Arena</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Once you start a chat or select a media file, the interactive interface will appear here. No active session yet.
            </p>
          </div>
          <Button variant="outline" className="rounded-2xl border-primary/20 hover:bg-primary/5">
            Quick Start Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
