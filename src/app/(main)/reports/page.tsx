
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
  Line,
  LineChart,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";

const weeklyMoodData = [
    { date: "2024-07-22", mood: 0.5 },
    { date: "2024-07-23", mood: -0.3 },
    { date: "2024-07-24", mood: 0.8 },
    { date: "2024-07-25", mood: 0.6 },
    { date: "2024-07-26", mood: -0.1 },
    { date: "2024-07-27", mood: 0.9 },
    { date: "2024-07-28", mood: 0.7 },
];

const chartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const triggerKeywords = ["project", "deadline", "team", "friends", "sleep", "work", "family", "exercise"];

const suggestedStrategies = [
  "Practice mindfulness or deep breathing exercises when feeling anxious about deadlines.",
  "Consider scheduling short breaks during your workday to recharge.",
  "Make time for social activities with friends to boost your mood.",
  "Breaking down large projects into smaller, manageable tasks can reduce overwhelm.",
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
             <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart
                accessibilityLayer
                data={weeklyMoodData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis domain={[-1, 1]} tickLine={false} axisLine={false} tickMargin={8} />
                 <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                <Line
                  dataKey="mood"
                  type="monotone"
                  stroke="var(--color-mood)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-mood)",
                    r: 4,
                  }}
                   activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
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
              <Badge key={keyword} variant="secondary" className="text-base font-medium">
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
