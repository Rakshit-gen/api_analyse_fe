import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, ArrowRight, Sparkles, Code2, Shield } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      {/* BACKGROUND COMPONENT - This should render */}
      <AnimatedBackground />
      
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Terminal className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">API Debugger</span>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="sm">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex h-20 w-20 rounded-2xl bg-primary/10 backdrop-blur-sm items-center justify-center mb-4 shadow-lg border border-primary/20">
            <Terminal className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            AI-Powered API Debugging
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multi-agent system that analyzes, diagnoses, and fixes your API integration issues in seconds
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="h-12 px-8 shadow-lg">
                  Start Debugging
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline" className="h-12 px-8 backdrop-blur-sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 shadow-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 backdrop-blur-sm bg-card/50 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
              <CardDescription className="text-sm">
                6 specialized agents work together to diagnose your API issues
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 backdrop-blur-sm bg-card/50 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Instant Solutions</CardTitle>
              <CardDescription className="text-sm">
                Get actionable fixes with code examples in multiple languages
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 backdrop-blur-sm bg-card/50 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
              <CardDescription className="text-sm">
                Your API data is analyzed securely and never stored
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}