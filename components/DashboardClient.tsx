"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Terminal, Sparkles, Loader2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { DotPattern } from "./DotPattern";
import DebugForm from "./DebugForm";

export default function DashboardClient() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative p-4">
      {/* BACKGROUND COMPONENT - This should render */}
      <DotPattern />
      
      {/* Header */}
      <div className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">API Debugger</h1>
                <p className="text-sm text-muted-foreground">Multi-agent diagnostic system</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="hidden md:inline">AI-powered analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 backdrop-blur-sm rounded-lg">
                  <span className="text-sm font-medium">
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                </div>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Form */}
      <div className="relative p-4">
        <DebugForm />
      </div>
    </div>
  );
}