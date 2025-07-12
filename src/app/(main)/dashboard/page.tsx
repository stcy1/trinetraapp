
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookHeart, MessageCircle, ArrowRight, CornerUpRight, Info, CalendarDays, Sparkles, Flower2 } from "lucide-react";
import { DashboardMoodGarden } from './mood-garden-preview';

type Sentiment = "positive" | "neutral" | "negative";

interface JournalEntry {
  id: number;
  content: string;
  date: string;
  sentiment: Sentiment;
  score: number;
}

const JOURNAL_ENTRIES_KEY = 'trinetra-journal-entries';


export default function DashboardPage() {
  const [recentEntry, setRecentEntry] = useState<JournalEntry | null>(null);
  const [userName, setUserName] = useState("friend");

  useEffect(() => {
    const storedEntries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
    if (storedEntries) {
      const entries: JournalEntry[] = JSON.parse(storedEntries);
      if (entries.length > 0) {
        setRecentEntry(entries[0]);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Welcome back, {userName}.
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready to explore your thoughts and feelings today?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col justify-between bg-primary/5">
            <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookHeart className="h-6 w-6" />
                </div>
            <CardTitle className="text-2xl pt-2">New Journal Entry</CardTitle>
            <CardDescription className="text-base">
                A new entry is a new step on your journey of self-discovery.
            </CardDescription>
            </CardHeader>
            <CardFooter>
            <Link href="/journal">
                <Button>
                <span>Write a New Entry</span>
                <CornerUpRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            </CardFooter>
        </Card>
        <Card className="flex flex-col justify-between bg-primary/5">
            <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="h-6 w-6" />
                </div>
            <CardTitle className="text-2xl pt-2">AI Companion</CardTitle>
            <CardDescription className="text-base">
                Need to talk it out? Your AI companion is here to listen.
            </CardDescription>
            </CardHeader>
            <CardFooter>
            <Link href="/chat">
                <Button>
                <span>Chat with AI</span>
                <CornerUpRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Mood Garden 🌼</CardTitle>
          <CardDescription>A glimpse of your most recent thoughts and feelings.</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardMoodGarden />
        </CardContent>
        <CardFooter>
            <Link href="/mood-garden">
              <Button variant="secondary">
                <span>View Full Garden</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
        </CardFooter>
      </Card>


      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex flex-col">
           <CardHeader>
            <CardTitle>Your Most Recent Entry</CardTitle>
             {recentEntry ? (
              <CardDescription>From {new Date(recentEntry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</CardDescription>
            ) : (
               <CardDescription>You haven't written any entries yet.</CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex-grow">
             {recentEntry ? (
              <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
                "{recentEntry.content.substring(0, 280)}{recentEntry.content.length > 280 ? '...' : ''}"
              </blockquote>
            ) : (
               <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full rounded-lg bg-secondary/20 p-8">
                  <Info className="h-8 w-8 mb-2" />
                  <p>Your latest journal entry will appear here.</p>
                  <p className="text-sm">Click "Write a New Entry" above to get started.</p>
               </div>
            )}
          </CardContent>
          <CardFooter>
             <Link href="/journal">
              <Button variant="secondary" disabled={!recentEntry}>
                <span>View All Entries</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-6">
            <Card className="flex flex-col flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <CalendarDays className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Mood Calendar</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">Visualize your emotional journey and spot patterns over time.</p>
              </CardContent>
              <CardFooter>
                <Link href="/calendar" className="w-full">
                  <Button variant="secondary" className="w-full">View Calendar</Button>
                </Link>
              </CardFooter>
            </Card>
             <Card className="flex flex-col flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">AI Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">Discover connections and get personalized coping strategies.</p>
              </CardContent>
              <CardFooter>
                <Link href="/insights" className="w-full">
                  <Button variant="secondary" className="w-full">Generate Insights</Button>
                </Link>
              </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
