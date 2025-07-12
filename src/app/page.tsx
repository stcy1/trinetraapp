import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Play, Mic } from "lucide-react";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground">
        <header className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary-foreground" />
            <span className="text-2xl font-bold">Trinetra</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start justify-center text-left">
            <h1 className="text-5xl font-bold tracking-tighter text-primary-foreground md:text-6xl lg:text-7xl">
              Connect with Your Emotions
            </h1>
            <p className="mt-6 max-w-md text-lg text-primary-foreground/90">
              Record your thoughts, gain insights, and reflect with a
              supportive AI companion.
            </p>
            <Button
              asChild
              className="mt-8 rounded-full bg-background px-8 py-6 text-lg font-semibold text-primary hover:bg-background/90"
            >
              <Link href="/dashboard">Start Your Journey</Link>
            </Button>
          </div>
          <div className="relative flex items-center justify-center">
            <Image
              src="https://placehold.co/500x500.png"
              alt="Illustration of a person talking to an AI companion"
              width={500}
              height={500}
              className="h-auto w-full max-w-sm md:max-w-md"
              data-ai-hint="woman talking robot"
            />
          </div>
        </main>
      </section>

      {/* Features Section */}
      <section className="w-full bg-background py-20 text-foreground md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tighter">
            See How It Works
          </h2>
          <div className="relative mx-auto mt-12 aspect-video max-w-4xl rounded-xl border-2 border-accent bg-accent/20 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-md transition-transform hover:scale-105">
                <Play className="h-10 w-10 translate-x-0.5 text-foreground" />
              </button>
            </div>
          </div>

          <h2 className="mb-4 mt-20 text-center text-4xl font-bold tracking-tighter md:mt-28">
            Engage in AI-powered conversations
          </h2>

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border-2 border-accent bg-accent/20 p-8 text-center shadow-lg">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mic className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold">
              Engage in AI-powered conversations
            </h3>
            <p className="mt-4 text-foreground/80">
              Have voice chats about your feelings and experiences. Get
              empathetic responses and insights, powered by AI.
            </p>
            <Button
              variant="outline"
              className="mt-8 rounded-full border-foreground bg-background px-8 py-6 text-base font-semibold text-foreground hover:bg-foreground hover:text-background"
            >
              Start Listening
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-background">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Trinetra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
