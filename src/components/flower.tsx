
"use client";

import type { SVGProps } from "react";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FlowerProps extends SVGProps<SVGSVGElement> {
  moodScore?: number | null;
}

export function Flower({ moodScore = 0.5, ...props }: FlowerProps) {
  const flowerStyles = useMemo(() => {
    const score = moodScore ?? 0.5; // Default to neutral if null
    const scale = 0.8 + Math.abs(score) * 0.4; // Scale from 0.8 to 1.2
    
    // Interpolate color from red (negative) to yellow (neutral) to green (positive)
    let color;
    if (score < 0) {
      // from red to yellow
      const r = 255;
      const g = Math.round(255 * (1 + score));
      const b = 0;
      color = `rgb(${r}, ${g}, ${b})`;
    } else {
      // from yellow to green
      const r = Math.round(255 * (1 - score));
      const g = 255;
      const b = 0;
      color = `rgb(${r}, ${g}, ${b})`;
    }
    
    return {
      transform: `scale(${scale})`,
      color: color,
    };
  }, [moodScore]);

  const moodLabel = useMemo(() => {
    const score = moodScore ?? 0.5;
     if (score > 0.6) return 'Very Positive';
    if (score > 0.2) return 'Positive';
    if (score > -0.2) return 'Neutral';
    if (score > -0.6) return 'Negative';
    return 'Very Negative';
  }, [moodScore]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <svg
            width="60"
            height="100"
            viewBox="0 0 60 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 ease-in-out hover:scale-110"
            {...props}
          >
            <g style={{ transformOrigin: 'bottom center', ...flowerStyles }}>
              {/* Petals */}
              <circle cx="30" cy="15" r="10" fill="currentColor" />
              <circle cx="15" cy="25" r="10" fill="currentColor" />
              <circle cx="45" cy="25" r="10" fill="currentColor" />
              <circle cx="20" cy="40" r="10" fill="currentColor" />
              <circle cx="40" cy="40" r="10" fill="currentColor" />
              {/* Center */}
              <circle cx="30" cy="30" r="8" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
            </g>
            {/* Stem */}
            <path
              d="M30 50V100"
              stroke="#228B22"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Leaf */}
            <path
              d="M30 70 C 40 65, 45 75, 30 80"
              fill="#228B22"
              stroke="#006400"
              strokeWidth="1"
            />
          </svg>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mood: {moodLabel} ({moodScore?.toFixed(2)})</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

