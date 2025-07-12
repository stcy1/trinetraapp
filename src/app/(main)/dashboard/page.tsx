
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookHeart, MessageCircle, ArrowRight, CornerUpRight, Info } from "lucide-react";
import Image from "next/image";

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
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Welcome back, friend.
        </h1>
        <p className="text-muted-foreground">
          Ready to explore your thoughts and feelings today?
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col lg:col-span-2">
           <CardHeader>
            <CardTitle>Your Recent Entry</CardTitle>
             {recentEntry ? (
              <CardDescription>{recentEntry.date}</CardDescription>
            ) : (
               <CardDescription>You haven't written any entries yet.</CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex-grow">
             {recentEntry ? (
              <p className="text-muted-foreground italic">
                "{recentEntry.content}"
              </p>
            ) : (
               <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full">
                  <Info className="h-8 w-8 mb-2" />
                  <p>Your latest journal entry will appear here.</p>
                  <p className="text-sm">Click "Write" to get started.</p>
               </div>
            )}
          </CardContent>
          <div className="p-6 pt-0">
             <Link href="/journal">
              <Button variant="secondary" disabled={!recentEntry}>
                <span>View All Entries</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
        <div className="flex flex-col gap-6">
            <Card className="flex flex-col flex-grow">
              <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookHeart className="h-6 w-6" />
                  </div>
                <CardTitle className="text-xl">New Journal</CardTitle>
                <CardDescription className="text-sm">
                  A new entry is a new step.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <div className="p-6 pt-0">
                <Link href="/journal">
                  <Button className="w-full">
                    <span>Write</span>
                    <CornerUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
             <Card className="flex flex-col flex-grow">
              <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                <CardTitle className="text-xl">AI Companion</CardTitle>
                <CardDescription className="text-sm">
                  Talk through your feelings.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <div className="p-6 pt-0">
                <Link href="/chat">
                  <Button className="w-full">
                    <span>Chat</span>
                     <CornerUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
        </div>
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
