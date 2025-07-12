"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import type { DayPicker } from "react-day-picker";
import { format } from "date-fns";

type Sentiment = "positive" | "neutral" | "negative";

interface JournalEntry {
  id: number;
  content: string;
  date: string; // ISO string
  sentiment: Sentiment;
  score: number;
}

const JOURNAL_ENTRIES_KEY = 'trinetra-journal-entries';

const modifierStyles: DayPicker["modifiersStyles"] = {
  positive: {
    backgroundColor: "hsl(var(--primary) / 0.2)",
    color: "hsl(var(--primary))",
  },
  negative: {
    backgroundColor: "hsl(var(--destructive) / 0.2)",
    color: "hsl(var(--destructive))",
  },
  neutral: {
    backgroundColor: "hsl(var(--accent) / 0.3)",
    color: "hsl(var(--accent-foreground))",
  },
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [moodModifiers, setMoodModifiers] = useState<Record<Sentiment, Date[]>>({
    positive: [],
    neutral: [],
    negative: [],
  });

  useEffect(() => {
    const storedEntries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
    if (storedEntries) {
      const entries: JournalEntry[] = JSON.parse(storedEntries);
      
      const modifiers = entries.reduce(
        (acc, entry) => {
          const sentiment = entry.sentiment.toLowerCase() as Sentiment;
          if (acc[sentiment]) {
            acc[sentiment].push(new Date(entry.date));
          }
          return acc;
        },
        { positive: [], neutral: [], negative: [] } as Record<Sentiment, Date[]>
      );
      setMoodModifiers(modifiers);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Mood Calendar
        </h1>
        <p className="text-muted-foreground">
          Visualize your emotional journey and spot recurring patterns based on your journal entries.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-start gap-6 p-4 md:flex-row md:p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={moodModifiers}
            modifiersStyles={modifierStyles}
            defaultMonth={new Date()}
          />
          <div className="flex w-full flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{backgroundColor: 'hsl(var(--primary) / 0.2)'}} />
                  <span className="text-sm">Positive</span>
                </div>
                 <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{backgroundColor: 'hsl(var(--accent) / 0.3)'}} />
                  <span className="text-sm">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{backgroundColor: 'hsl(var(--destructive) / 0.2)'}} />
                  <span className="text-sm">Negative</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Month at a Glance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This month you've had{" "}
                  <Badge variant="secondary" className="font-bold" style={{color: 'hsl(var(--primary))'}}>
                    {moodModifiers.positive?.length || 0} positive
                  </Badge>{" "}
                  days,{" "}
                  <Badge variant="secondary" className="font-bold" style={{color: 'hsl(var(--destructive))'}}>
                    {moodModifiers.negative?.length || 0} negative
                  </Badge>{" "}
                  days, and{" "}
                  <Badge variant="secondary" className="font-bold">
                    {moodModifiers.neutral?.length || 0} neutral
                  </Badge>{" "}
                  days. Use this to reflect on what influences your mood.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
