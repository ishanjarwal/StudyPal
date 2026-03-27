"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
          <a href="#features" className="hover:text-primary transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-primary transition">
            Pricing
          </a>
          <a href="#" className="hover:text-primary transition">
            Testimonials
          </a>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeSwitcher />

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
            <UserButton afterSwitchSessionUrl="/" />
          </Show>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t">
          <a
            href="#features"
            className="block text-sm"
            onClick={() => setOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-sm"
            onClick={() => setOpen(false)}
          >
            Pricing
          </a>
          <a href="#" className="block text-sm" onClick={() => setOpen(false)}>
            Testimonials
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
