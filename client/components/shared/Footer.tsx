"use client";

import { Show } from "@clerk/nextjs";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-lg">StudyPal</h3>
            <p className="text-muted-foreground mt-2">
              AI-powered PDF chat for smarter studying using RAG.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Auth Aware Section */}
          <div>
            <h4 className="font-medium mb-3">Account</h4>

            <Show when={"signed-out"}>
              <p className="text-muted-foreground">
                Sign in to start chatting with your PDFs.
              </p>
            </Show>

            <Show when={"signed-in"}>
              <p className="text-muted-foreground">
                You’re signed in. Continue your learning journey 🚀
              </p>
            </Show>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StudyPal. All rights reserved.</p>

          {/* Credit */}
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by</span>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
            >
              Ishan Jarwal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
