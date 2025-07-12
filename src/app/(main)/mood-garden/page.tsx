
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Flower } from '@/components/flower';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Loader2 } from 'lucide-react';
import { getMoodGardenData } from '@/services/journal';
import { GardenControls, type Filters } from './controls';

type JournalEntry = {
  id: number;
  user_id: string;
  emotion: string;
  mood_score: number;
  created_at: string;
  transcript: string;
};

export default function MoodGardenPage() {
  const [data, setData] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    emotion: 'all',
    dateRange: 'all',
    sort: 'newest',
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedData = await getMoodGardenData();
      setData(fetchedData || []);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Filter by emotion
    if (filters.emotion !== 'all') {
      filtered = filtered.filter(entry => entry.emotion === filters.emotion);
    }
    
    // Filter by date range
    const now = new Date();
    if (filters.dateRange === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(entry => new Date(entry.created_at) >= startOfMonth);
    } else if (filters.dateRange === 'week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0,0,0,0);
        filtered = filtered.filter(entry => new Date(entry.created_at) >= startOfWeek);
    }

    // Sort
    filtered.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return filters.sort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [data, filters]);

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
                Filter and sort to explore your emotional landscape.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <GardenControls filters={filters} onFilterChange={setFilters} />
            {isLoading ? (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px] rounded-lg bg-secondary/20 p-8">
                    <Loader2 className="h-12 w-12 mb-4 animate-spin text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Cultivating your garden...</h3>
                 </div>
            ) : filteredData.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-4 gap-y-8 p-4 rounded-lg bg-secondary/20 min-h-[400px] items-end justify-center">
                    {filteredData.map((entry) => (
                        <div key={entry.id} className="flex flex-col items-center group">
                            <Flower
                                emotion={entry.emotion || 'calm'}
                                mood_score={entry.mood_score || 0}
                                timestamp={entry.created_at}
                                transcript={entry.transcript || 'No transcript available.'}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px] rounded-lg bg-secondary/20 p-8">
                  <Info className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Your garden is waiting to sprout!</h3>
                  <p>No journal entries found for the selected filters.</p>
                  <p className="text-sm">Write an entry to plant your first flower.</p>
               </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
