"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookHeart, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Welcome back, friend.
        </h1>
        <p className="text-muted-foreground">
          Ready to explore your thoughts and feelings today?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookHeart className="h-6 w-6" />
              </div>
              <CardTitle>Journal</CardTitle>
            </div>
            <CardDescription>
              Record your thoughts and feelings. Your private space for
              self-reflection.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              A new entry is a new step on your journey. What's on your mind?
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Link href="/journal">
              <Button className="w-full">
                <span>Start a New Entry</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="h-6 w-6" />
              </div>
              <CardTitle>AI Companion</CardTitle>
            </div>
            <CardDescription>
              Talk through your feelings with a supportive AI companion.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Sometimes a conversation can illuminate the path forward.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Link href="/chat">
              <Button className="w-full">
                <span>Start a Conversation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      <Card>
        <div className="grid md:grid-cols-2">
          <div className="p-6">
            <CardTitle>Discover Your Patterns</CardTitle>
            <CardDescription className="mt-2">
              Our tools help you visualize your emotional landscape over time.
              Find clarity and gain insights into your well-being.
            </CardDescription>
            <div className="mt-6 flex gap-4">
              <Link href="/calendar">
                <Button variant="secondary">View Mood Calendar</Button>
              </Link>
              <Link href="/insights">
                <Button variant="secondary">Generate Insights</Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden h-full min-h-[200px] w-full items-center justify-center overflow-hidden rounded-r-lg bg-muted md:flex">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Calm landscape"
                layout="fill"
                objectFit="cover"
                data-ai-hint="calm landscape"
              />
          </div>
        </div>
      </Card>
    </div>
  );
}
