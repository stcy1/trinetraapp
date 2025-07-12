"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const weeklyMoodData = [
  { name: "Mon", mood: 0.5 },
  { name: "Tue", mood: -0.3 },
  { name: "Wed", mood: 0.8 },
  { name: "Thu", mood: 0.6 },
  { name: "Fri", mood: -0.1 },
  { name: "Sat", mood: 0.9 },
  { name: "Sun", mood: 0.7 },
];

const triggerKeywords = ["project", "deadline", "team", "friends", "sleep"];

const suggestedStrategies = [
  "Practice deep breathing for anxiety.",
  "Establish a consistent sleep schedule.",
  "Schedule social activities proactively.",
  "Break down large tasks into smaller steps.",
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Weekly Report
          </h1>
          <p className="text-muted-foreground">
            A summary of your week: July 22 - July 28, 2024
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Mood Trend</CardTitle>
          <CardDescription>
            Your daily mood score from -1 (Negative) to 1 (Positive).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMoodData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[-1, 1]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Bar dataKey="mood" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trigger Keywords</CardTitle>
            <CardDescription>
              Commonly used words in your entries this week.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {triggerKeywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-base">
                {keyword}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Strategies</CardTitle>
            <CardDescription>
              Personalized coping strategies based on your week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {suggestedStrategies.map((strategy) => (
                <li key={strategy}>{strategy}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
