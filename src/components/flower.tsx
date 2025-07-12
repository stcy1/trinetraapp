
"use client";

import type { SVGProps } from "react";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Emotion = 'calm' | 'happy' | 'anxious' | 'sad' | 'angry' | string;

interface FlowerProps {
  emotion?: Emotion;
  mood_score?: number | null;
  timestamp?: string;
  transcript?: string;
}

const flowerSvgs: Record<Emotion, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  happy: (props) => ( // Sunflower
    <svg {...props} viewBox="0 0 100 100">
      <g className="sunflower-petals" fill="#FFC700">
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(0 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(30 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(60 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(90 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(120 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(150 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(180 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(210 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(240 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(270 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(300 50 50)" />
        <path d="M50 0 L60 30 L40 30 Z" transform="rotate(330 50 50)" />
      </g>
      <circle cx="50" cy="50" r="20" fill="#6B4226" />
    </svg>
  ),
  sad: (props) => ( // Bluebell
    <svg {...props} viewBox="0 0 100 100">
      <g className="bluebell-bloom" fill="#6495ED" transform="scale(1.2)">
        <path d="M50 40 C 40 55, 60 55, 50 40" />
        <path d="M50 40 C 40 65, 50 70, 50 40" transform="rotate(20 50 50)" />
        <path d="M50 40 C 60 65, 50 70, 50 40" transform="rotate(-20 50 50)" />
        <ellipse cx="50" cy="70" rx="15" ry="5" />
      </g>
    </svg>
  ),
  anxious: (props) => ( // Lavender
    <svg {...props} viewBox="0 0 100 100">
       <g fill="#E6E6FA">
         <circle cx="50" cy="20" r="5" className="lavender-bud" />
         <circle cx="55" cy="28" r="5" className="lavender-bud" />
         <circle cx="45" cy="28" r="5" className="lavender-bud" />
         <circle cx="50" cy="36" r="5" className="lavender-bud" />
         <circle cx="60" cy="44" r="5" className="lavender-bud" />
         <circle cx="40" cy="44" r="5" className="lavender-bud" />
       </g>
    </svg>
  ),
  angry: (props) => ( // Cactus Bloom
    <svg {...props} viewBox="0 0 100 100">
      <path d="M30 100 C 10 70, 10 30, 30 10 H 70 C 90 30, 90 70, 70 100 Z" fill="#228B22" />
      <g className="cactus-bloom" fill="#FF4500">
        <circle cx="50" cy="20" r="10" />
        <path d="M50 20 L65 10 L60 25 Z" />
        <path d="M50 20 L35 10 L40 25 Z" />
        <path d="M50 20 L60 35 L45 30 Z" />
      </g>
    </svg>
  ),
  calm: (props) => ( // Lotus
    <svg {...props} viewBox="0 0 100 100">
      <g className="lotus-petals" fill="#FFB6C1">
        <path d="M50 30 C 20 50, 20 80, 50 100 C 80 80, 80 50, 50 30 Z" />
        <path d="M50 40 C 30 55, 35 75, 50 90 C 65 75, 70 55, 50 40 Z" opacity="0.7" />
      </g>
    </svg>
  ),
};

export function Flower({
  emotion = "calm",
  mood_score = 0,
  timestamp,
  transcript,
}: FlowerProps) {
  const { growthStage, style } = useMemo(() => {
    const score = mood_score ?? 0;
    if (score <= 0.3) {
      return {
        growthStage: "Bud",
        style: { transform: "scale(0.6)", opacity: 0.7 },
      };
    }
    if (score <= 0.6) {
      return {
        growthStage: "Half Bloom",
        style: { transform: "scale(0.8)", opacity: 0.85 },
      };
    }
    return {
      growthStage: "Full Bloom",
      style: { transform: "scale(1)", opacity: 1 },
    };
  }, [mood_score]);

  const FlowerSvg = flowerSvgs[emotion] || flowerSvgs.calm;

  const truncatedTranscript = useMemo(() => {
    if (!transcript) return "No transcript available.";
    return transcript.split(" ").slice(0, 20).join(" ") + (transcript.split(" ").length > 20 ? "..." : "");
  }, [transcript]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center">
            <div className="relative h-[80px] w-[80px] transition-transform duration-300 ease-in-out hover:scale-110 flex items-end justify-center">
                <FlowerSvg style={style} className="absolute bottom-0 h-auto w-full" />
                <div style={{ height: '80%' }} className="relative w-full flex items-end justify-center">
                  <svg viewBox="0 0 100 100" className="absolute bottom-0 h-full w-full">
                    <path d="M50 50 V 100" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50 70 C 60 65, 65 75, 50 80" fill="#34D399" />
                  </svg>
                </div>
            </div>
             {timestamp && (
              <span className="mt-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {format(new Date(timestamp), "MMM d")}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1.5 text-sm">
            <p className="font-bold">
              {emotion.charAt(0).toUpperCase() + emotion.slice(1)} - {growthStage}
            </p>
            {timestamp && <p className="text-xs text-muted-foreground">{format(new Date(timestamp), "PPP p")}</p>}
            <blockquote className="mt-2 border-l-2 pl-3 italic text-muted-foreground">
              "{truncatedTranscript}"
            </blockquote>
            <p className="text-xs font-mono text-muted-foreground">Mood Score: {mood_score?.toFixed(2)}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

    