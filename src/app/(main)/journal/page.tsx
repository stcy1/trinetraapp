"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { analyzeSentiment } from "@/ai/flows/analyze-sentiment";
import { useToast } from "@/hooks/use-toast";

type Sentiment = "positive" | "neutral" | "negative";

interface JournalEntry {
  id: number;
  content: string;
  date: string;
  sentiment: Sentiment;
  score: number;
}

const initialEntries: JournalEntry[] = [
  {
    id: 1,
    content:
      "Feeling really optimistic about the new project. Had a great meeting with the team and I think we're on the right track. The sun was shining on my walk home, which was a nice bonus.",
    date: "2 days ago",
    sentiment: "positive",
    score: 0.9,
  },
  {
    id: 2,
    content:
      "A bit of a slow day. Didn't get as much done as I hoped. Just feeling a bit flat, nothing majorly wrong, but not great either. Hopefully tomorrow is better.",
    date: "Yesterday",
    sentiment: "neutral",
    score: 0.1,
  },
];

const sentimentColors: Record<Sentiment, string> = {
  positive: "bg-green-500",
  neutral: "bg-yellow-500",
  negative: "bg-red-500",
};

export default function JournalPage() {
  const [newEntry, setNewEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAddEntry = async () => {
    if (!newEntry.trim()) return;
    setIsAnalyzing(true);

    try {
      const result = await analyzeSentiment({ text: newEntry });

      const entry: JournalEntry = {
        id: Date.now(),
        content: newEntry,
        date: "Just now",
        // Ensure the sentiment from AI is one of the allowed types.
        sentiment: result.sentiment.toLowerCase() as Sentiment,
        score: result.score,
      };
      setEntries([entry, ...entries]);
      setNewEntry("");
    } catch (error) {
      console.error("Failed to analyze sentiment:", error);
      toast({
        title: "Error",
        description: "Could not analyze your journal entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          My Journal
        </h1>
        <p className="text-muted-foreground">
          Your private space for reflection and discovery.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription>
            What's on your mind today? You can type or record your thoughts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Today I'm feeling..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            rows={6}
            className="text-base"
            disabled={isAnalyzing}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setIsRecording(!isRecording)}
            className="flex items-center gap-2"
            disabled={isAnalyzing}
          >
            <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
            {isRecording ? "Stop Recording" : "Record Audio"}
          </Button>
          <Button onClick={handleAddEntry} disabled={!newEntry.trim() || isAnalyzing}>
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {isAnalyzing ? "Analyzing..." : "Save Entry"}
          </Button>
        </CardFooter>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Past Entries</h2>
        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-6">
                <p className="text-muted-foreground">{entry.content}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{entry.date}</span>
                <div className="flex items-center gap-2">
                   <div className={`h-2.5 w-2.5 rounded-full ${sentimentColors[entry.sentiment] || 'bg-gray-400'}`} />
                  <span className="capitalize">{entry.sentiment}</span>
                  <Badge variant="outline">Score: {entry.score.toFixed(2)}</Badge>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
