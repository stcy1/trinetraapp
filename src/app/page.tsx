import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookHeart, MessageCircle, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">Trinetra</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-20 text-center sm:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Find Clarity and Peace Within
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Trinetra is your personal AI companion for emotional wellness.
            Understand your feelings, discover patterns, and grow on your
            journey to self-discovery.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-16">
           <div className="relative aspect-video w-full overflow-hidden rounded-xl border shadow-lg">
             <Image
                src="https://placehold.co/1200x600.png"
                alt="Trinetra app dashboard screenshot"
                layout="fill"
                objectFit="cover"
                data-ai-hint="calm app interface"
             />
           </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Your Toolkit for Emotional Wellness
              </h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to navigate your inner world.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookHeart className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Private Journal</h3>
                <p className="mt-2 text-muted-foreground">
                  A safe space to record your daily thoughts, feelings, and experiences.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">AI Companion</h3>
                <p className="mt-2 text-muted-foreground">
                  Engage in supportive dialogue to explore your emotions and gain new perspectives.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Personalized Insights</h3>
                <p className="mt-2 text-muted-foreground">
                  Uncover patterns in your mood and receive actionable advice to foster well-being.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

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