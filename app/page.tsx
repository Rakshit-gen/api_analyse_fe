import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, ArrowRight, Sparkles, Code2, Shield, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* BACKGROUND COMPONENT */}
      <AnimatedBackground />
      
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      
      {/* Header */}
      <header className="border-b backdrop-blur-md bg-background/60 sticky top-0 z-50 fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                
                <Image src='/sentra.svg' alt='logo' width={100} height={100} className="rounded-lg" />
              </div>
              <span className="font-semibold text-lg">SentralQ</span>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="hover-lift">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="hover-lift hidden md:flex bg-gradient-to-r from-primary to-primary/80">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                   <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container -mt-10 mx-auto px-4 py-24 md:py-32 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 bg-card/50 backdrop-blur-sm text-sm fade-in-up">
            <Zap className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground whitespace-nowrap">Powered by Multi-Agent AI</span>
          </div>
          <br></br>
          <br></br>


<div className="mt-4 inline-flex h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-sm items-center hover:scale-105 transition justify-center shadow-2xl border border-primary/20 fade-in-up animation-delay-100 hover-lift">
            <Image src='/sentra.svg' alt='logo' width={110} height={110} className="rounded-3xl scale-105 hover:scale-110 transition" />
          </div>
          {/* Main Heading with Gradient */}
          <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight fade-in-up animation-delay-200">
            <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              AI-Powered API
            </span>
            <br />
            
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Debugging
            </span>
          </h1>
          {/* Hero Icon - Added explicit margin-top for spacing */}
          
          
          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed fade-in-up animation-delay-300">
            Multi-agent system that analyzes, diagnoses, and fixes your API integration issues{" "}
            <span className="text-foreground font-semibold">in seconds</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 fade-in-up animation-delay-400">
            <SignedOut>
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <Button size="lg" className="h-14 px-10 text-base shadow-xl hover-lift group bg-gradient-to-r from-primary to-primary/90 hover:shadow-2xl">
                  Start Debugging Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <Button size="lg" variant="outline" className="h-14 px-10 text-base backdrop-blur-sm border-2 hover-lift">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 text-base shadow-xl hover-lift group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </SignedIn>
          </div>

          {/* Social Proof */}
        </div>
      </section>

      {/* Features */}
      <section className="container -mt-10 mx-auto px-4 py-20 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Debug Smarter, Not Harder
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leverage the power of AI agents to solve API issues faster than ever before
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card group border-2 backdrop-blur-sm bg-gradient-to-b from-card/80 to-card/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 fade-in-up">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI-Powered Analysis</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  6 specialized agents work together to diagnose your API issues with pinpoint accuracy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group border-2 backdrop-blur-sm bg-gradient-to-b from-card/80 to-card/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 fade-in-up animation-delay-100">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Instant Solutions</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get actionable fixes with code examples in Python, JavaScript, cURL, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group border-2 backdrop-blur-sm bg-gradient-to-b from-card/80 to-card/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 fade-in-up animation-delay-200">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Your API data is analyzed securely with enterprise-grade encryption and never stored
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 backdrop-blur-sm bg-gradient-to-br from-primary/5 via-card/50 to-primary/5 shadow-2xl fade-in-up">
            <CardHeader className="text-center space-y-6 py-12">
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Ready to fix your API issues?
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Join developers who are debugging faster with AI-powered assistance
              </CardDescription>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="h-14 px-10 text-base shadow-xl hover-lift group mt-4">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-10 text-base shadow-xl hover-lift group mt-4">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </SignedIn>
            </CardHeader>
          </Card>
        </div>
      </section>


    </div>
  );
}