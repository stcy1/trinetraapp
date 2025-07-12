
import { getMoodGardenData } from '@/services/journal';
import { Flower } from '@/components/flower';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default async function MoodGardenPage() {
  const data = await getMoodGardenData();

  return (
    <div className="flex flex-col gap-6">
       <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Mood Garden
        </h1>
        <p className="text-muted-foreground">
          A beautiful garden grown from your thoughts and feelings. Each flower represents a journal entry.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Your Garden</CardTitle>
            <CardDescription>
                Watch your garden grow as you continue your journaling journey.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 p-4 rounded-lg bg-secondary/20 min-h-[400px] items-end justify-center">
                    {data.map((entry) => (
                        <div key={entry.id} className="flex flex-col items-center group">
                            <Flower moodScore={entry.mood_score} />
                            <span className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {new Date(entry.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px] rounded-lg bg-secondary/20 p-8">
                  <Info className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Your garden is waiting to sprout!</h3>
                  <p>You haven't written any journal entries yet.</p>
                  <p className="text-sm">Write your first entry to plant a flower in your garden.</p>
               </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
