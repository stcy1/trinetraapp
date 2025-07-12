
"use client";

import { useState, useEffect } from 'react';
import { Flower } from '@/components/flower';
import { Info, Loader2 } from 'lucide-react';
import { getMoodGardenData } from '@/services/journal';
import { motion } from 'framer-motion';

type JournalEntry = {
  id: number;
  user_id: string;
  emotion: string;
  mood_score: number;
  created_at: string;
  transcript: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


export function DashboardMoodGarden() {
  const [data, setData] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // Fetch the 5 most recent entries for the preview
      const fetchedData = await getMoodGardenData(5); 
      setData(fetchedData || []);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-center text-muted-foreground min-h-[150px] rounded-lg bg-secondary/20 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[150px] rounded-lg bg-secondary/20 p-8">
        <Info className="h-8 w-8 mb-2" />
        <h3 className="font-semibold text-md mb-1">Your garden is waiting to sprout!</h3>
        <p className="text-sm">Write a journal entry to plant your first flower.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-3 sm:grid-cols-5 gap-x-4 gap-y-8 p-4 rounded-lg bg-secondary/20 min-h-[150px] items-end justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.map((entry) => (
          <Flower
            key={entry.id}
            emotion={entry.emotion || 'calm'}
            mood_score={entry.mood_score || 0}
            timestamp={entry.created_at}
            transcript={entry.transcript || 'No transcript available.'}
          />
      ))}
    </motion.div>
  );
}
