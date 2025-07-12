"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const mockInsights = {
  insights: `### Recurring Themes
*   **Anxiety about project deadlines:** You've mentioned feeling "stressed" and "overwhelmed" in relation to work projects multiple times over the last two weeks.
*   **Positive impact of social connection:** Your mood scores are consistently higher on days you mention spending time with friends.
*   **Sleep quality affects mood:** Entries after a "restless night" often correlate with lower mood scores the next day.`,
  copingStrategies: `### Suggested Coping Strategies (from NIMH)
*   **For Anxiety:** Try deep breathing exercises. Inhale for 4 seconds, hold for 7, and exhale for 8. Repeat this several times when you feel stress rising.
*   **To Improve Sleep:** Establish a relaxing bedtime routine. Avoid screens for an hour before bed and try reading a book or listening to calming music.
*   **Leverage Social Support:** Proactively schedule time with friends, as this has a clear positive effect on your well-being.`,
};

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    insights: string;
    copingStrategies: string;
  } | null>(null);

  const handleGenerateInsights = () => {
    setIsLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(mockInsights);
      setIsLoading(false);
    }, 2000);
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
                dangerouslySetInnerHTML={{ __html: results.insights.replace(/\n/g, '<br />') }}
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
                dangerouslySetInnerHTML={{ __html: results.copingStrategies.replace(/\n/g, '<br />') }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
