
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

// Mock data to simulate user history
const mockJournalEntries = `
- Feeling really optimistic about the new project. Had a great meeting with the team and I think we're on the right track. The sun was shining on my walk home, which was a nice bonus.
- A bit of a slow day. Didn't get as much done as I hoped. Just feeling a bit flat, nothing majorly wrong, but not great either. Hopefully tomorrow is better.
- Stressed about the upcoming deadline. So much to do.
- Had a wonderful time with friends tonight. It really lifted my spirits.
- Didn't sleep well last night, feeling groggy and irritable today.
`;

const mockChatLogs = `
User: I'm feeling so overwhelmed with work.
AI: It sounds like you're under a lot of pressure. What's one small thing you could do to feel even slightly better right now?
User: I'm not sure, maybe take a short walk.
AI: That's a great idea. A little fresh air can make a big difference.
`;

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
      const result = await generatePersonalizedInsights({
        journalEntries: mockJournalEntries,
        chatLogs: mockChatLogs,
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
