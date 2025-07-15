
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Play } from "lucide-react";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookHeart, MessageCircle, CalendarDays, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
             <Link href="#testimonials" className="text-sm font-medium hover:underline">
              Testimonials
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {user ? (
               <Button className="bg-background text-primary hover:bg-background/90" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="bg-background text-primary hover:bg-background/90" asChild>
                  <Link href="/login">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
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
      <section id="features" className="w-full bg-background py-20 text-foreground md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tighter">A Toolkit for Your Well-being</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Trinetra offers a suite of features designed to help you understand and nurture your emotional health.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookHeart className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Private Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A secure and private space to write down your thoughts, feelings, and daily reflections.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">AI Companion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Engage in supportive conversations with an AI designed to listen and help you explore your mind.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Mood Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visualize your emotional journey and identify patterns with a simple, color-coded calendar.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Uncover recurring themes and receive tailored coping strategies based on your entries.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Video Section */}
      <section className="w-full bg-background pb-20 text-foreground md:pb-28">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tighter">
            See How It Works
          </h2>
          <div className="relative mx-auto mt-12 aspect-video max-w-4xl rounded-xl border-2 border-accent bg-accent/20 shadow-lg">
             <Image
                src="https://placehold.co/1280x720.png"
                alt="App preview video"
                fill
                className="rounded-xl"
                data-ai-hint="calm landscape"
              />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-md transition-transform hover:scale-105">
                <Play className="h-10 w-10 translate-x-0.5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
       <section id="testimonials" className="w-full bg-primary/5 py-20 text-foreground md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tighter">Loved by People Like You</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              See what our users have to say about their journey with Trinetra.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                     <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman smiling" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Jessica S.</p>
                    <p className="text-sm text-muted-foreground">Marketing Manager</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Trinetra has been a game-changer for my mental health. The AI companion feels like a real friend, and the insights have helped me notice patterns I never would have on my own."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                 <div className="flex items-start">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="man portrait" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Michael D.</p>
                    <p className="text-sm text-muted-foreground">Software Developer</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "As someone who struggles to open up, the journal is perfect. It's my private space to just let it all out without judgment. Highly recommend it."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-background py-20 text-center text-foreground md:py-28">
        <div className="container mx-auto max-w-3xl px-4">
           <h2 className="mb-4 text-center text-4xl font-bold tracking-tighter">Ready to Begin Your Journey?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
             Take the first step towards a more mindful and emotionally balanced life. It's free to get started.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/dashboard">Start for Free</Link>
            </Button>
        </div>
      </section>


      <footer className="bg-background">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Trinetra. All rights reserved.
            </p>
          </div>
           <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

    