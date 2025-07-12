
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { generatePersonalizedInsights } from "@/ai/flows/generate-personalized-insights";
import { useToast } from "@/hooks/use-toast";
import { Remarkable } from "remarkable";

const JOURNAL_ENTRIES_KEY = "trinetra-journal-entries";
const CHAT_MESSAGES_KEY = "trinetra-chat-messages";

const md = new Remarkable();

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    insights: string;
    copingStrategies: string;
  } | null>(null);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setResults(null);
    try {
      const storedJournalEntries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
      const storedChatLogs = localStorage.getItem(CHAT_MESSAGES_KEY);

      const journalEntries = storedJournalEntries
        ? JSON.parse(storedJournalEntries)
            .map((entry: any) => `- ${entry.content}`)
            .join("\n")
        : "No journal entries yet.";

      const chatLogs = storedChatLogs
        ? JSON.parse(storedChatLogs)
            .map((msg: any) => `${msg.sender}: ${msg.text}`)
            .join("\n")
        : "No chat history yet.";

      if (journalEntries === "No journal entries yet." && chatLogs === "No chat history yet.") {
        toast({
          title: "Not Enough Data",
          description: "Please write a journal entry or chat with the AI companion first to generate insights.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const result = await generatePersonalizedInsights({
        journalEntries: journalEntries,
        chatLogs: chatLogs,
      });
      setResults(result);
    } catch (error) {
      console.error("Failed to generate insights:", error);
      toast({
        title: "Error",
        description: "Couldn't generate insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Personalized Insights
          </h1>
          <p className="text-muted-foreground">
            Discover patterns and gain clarity from your recent entries.
          </p>
        </div>
        <Button onClick={handleGenerateInsights} disabled={isLoading}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? "Analyzing..." : "Generate My Insights"}
        </Button>
      </div>

      {!results && !isLoading && (
        <Card className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="relative mb-4 h-48 w-48 text-muted-foreground">
              <Image src="https://placehold.co/300x300.png" layout="fill" alt="A person contemplating" data-ai-hint="thinking meditate" />
            </div>
            <CardTitle>Ready to uncover your insights?</CardTitle>
            <p className="mt-2 text-muted-foreground">
              Click the button to analyze your journal and chats.
            </p>
        </Card>
      )}

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: md.render(results.insights) }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Suggested Coping Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: md.render(results.copingStrategies) }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
