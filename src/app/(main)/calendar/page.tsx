"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import type { DayPicker } from "react-day-picker";

type Mood = "positive" | "neutral" | "negative";

const moodData: Record<string, Mood> = {
  "2024-07-01": "positive",
  "2024-07-03": "negative",
  "2024-07-04": "positive",
  "2024-07-05": "neutral",
  "2024-07-08": "negative",
  "2024-07-10": "positive",
  "2024-07-11": "positive",
  "2024-07-12": "positive",
  "2024-07-15": "neutral",
  "2024-07-18": "negative",
  "2024-07-22": "positive",
  "2024-07-25": "neutral",
  "2024-07-29": "negative",
};

// Map moods to dates for the calendar
const moodModifiers = Object.keys(moodData).reduce(
  (acc, dateStr) => {
    const mood = moodData[dateStr];
    if (mood) {
      if (!acc[mood]) {
        acc[mood] = [];
      }
      acc[mood].push(new Date(dateStr));
    }
    return acc;
  },
  {} as Record<Mood, Date[]>
);

const modifierStyles: DayPicker["modifiersStyles"] = {
  positive: {
    backgroundColor: "hsl(var(--primary) / 0.2)",
    color: "hsl(var(--primary))",
    fontWeight: "bold",
  },
  negative: {
    backgroundColor: "hsl(var(--destructive) / 0.1)",
    color: "hsl(var(--destructive))",
    fontWeight: "bold",
  },
  neutral: {
    backgroundColor: "hsl(var(--accent) / 0.2)",
    color: "hsl(var(--accent-foreground))",
  },
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Mood Calendar
        </h1>
        <p className="text-muted-foreground">
          Visualize your emotional journey and spot recurring patterns.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-4 md:flex-row md:p-6">
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
                  <div className="h-4 w-4 rounded-full" style={modifierStyles.positive} />
                  <span className="text-sm">Positive</span>
                </div>
                 <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={modifierStyles.neutral} />
                  <span className="text-sm">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={modifierStyles.negative} />
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
                  <Badge variant="secondary" className="font-bold text-green-600">
                    {moodModifiers.positive?.length || 0} positive
                  </Badge>{" "}
                  days,{" "}
                  <Badge variant="secondary" className="font-bold text-red-600">
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
