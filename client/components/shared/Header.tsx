"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 font-black text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>StudyPal</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-primary transition">
            Features
          </a>
          <a href="#" className="hover:text-primary transition">
            Pricing
          </a>
          <a href="#" className="hover:text-primary transition">
            Docs
          </a>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Signed Out */}
          <Show when={"signed-out"}>
            <SignInButton mode="modal">
              <Button variant="ghost">Login</Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button>Get Started</Button>
            </SignUpButton>
          </Show>

          {/* Signed In */}
          <Show when={"signed-in"}>
            <Button className="gap-2">
              <FileText className="w-4 h-4" />
              Upload PDF
            </Button>

            <UserButton afterSwitchSessionUrl="/" />
          </Show>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t">
          <a href="#" className="block text-sm">
            Features
          </a>
          <a href="#" className="block text-sm">
            Pricing
          </a>
          <a href="#" className="block text-sm">
            Docs
          </a>

          {/* Mobile Auth */}
          <div className="flex flex-col gap-2 pt-2">
            <Show when={"signed-out"}>
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full">
                  Login
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="w-full">Get Started</Button>
              </SignUpButton>
            </Show>

            <Show when={"signed-in"}>
              <Button className="w-full">Upload PDF</Button>
              <div className="flex justify-center pt-2">
                <UserButton afterSwitchSessionUrl="/" />
              </div>
            </Show>
          </div>
        </div>
      )}
    </nav>
  );
}
