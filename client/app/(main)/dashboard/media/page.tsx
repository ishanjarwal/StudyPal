"use client";

import { Library, Sparkles, FolderOpen, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const MediaPage = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Your Media Library</h2>
          <p className="text-muted-foreground">Manage your uploaded PDFs, notes, and study sessions.</p>
        </div>
        <Button className="rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
          <FolderOpen className="h-4 w-4" />
          Upload New
        </Button>
      </div>

      {/* Media Grid Placeholder */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group relative rounded-3xl border border-border bg-card hover:bg-accent/10 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md animate-in fade-in zoom-in-95" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <Sparkles className="h-12 w-12 text-muted-foreground/20 absolute -right-2 -bottom-2 group-hover:scale-125 transition-transform duration-500" />
               <FolderOpen className="h-10 w-10 text-muted-foreground/30 group-hover:text-primary transition-colors duration-300" />
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm truncate w-full">Study Material {i}.pdf</h4>
                  <p className="text-[10px] text-muted-foreground/70 uppercase font-bold tracking-wider">PDF • 1.2 MB</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                 <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/40 w-1/3 rounded-full" />
                 </div>
                 <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Processed</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Bottom Placeholder */}
      <div className="mt-8 rounded-[2rem] border-2 border-dashed border-border bg-muted/10 p-12 text-center flex flex-col items-center gap-4">
        <Library className="h-12 w-12 text-muted-foreground/20" />
        <div className="space-y-1">
          <p className="font-medium">Need more space?</p>
          <p className="text-sm text-muted-foreground">Pro members get unlimited storage for study materials.</p>
        </div>
        <Button variant="link" className="text-primary font-bold">Upgrade your library</Button>
      </div>
    </div>
  );
};

export default MediaPage;
