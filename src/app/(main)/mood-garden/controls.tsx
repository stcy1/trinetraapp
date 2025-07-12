
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Dispatch, type SetStateAction } from "react";

export type Filters = {
  emotion: 'all' | 'calm' | 'happy' | 'anxious' | 'sad' | 'angry';
  dateRange: 'all' | 'week' | 'month';
  sort: 'newest' | 'oldest';
};

interface GardenControlsProps {
  filters: Filters;
  onFilterChange: Dispatch<SetStateAction<Filters>>;
}

export function GardenControls({ filters, onFilterChange }: GardenControlsProps) {
    const handleValueChange = (key: keyof Filters, value: any) => {
        onFilterChange(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col gap-4 rounded-lg border bg-card-foreground/5 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="grid w-full gap-1.5 md:w-auto">
                    <Label htmlFor="emotion-filter">Emotion</Label>
                    <Select
                        value={filters.emotion}
                        onValueChange={(value) => handleValueChange('emotion', value)}
                    >
                        <SelectTrigger id="emotion-filter" className="w-full md:w-[150px]">
                            <SelectValue placeholder="Filter emotion" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="calm">Calm</SelectItem>
                            <SelectItem value="anxious">Anxious</SelectItem>
                            <SelectItem value="sad">Sad</SelectItem>
                            <SelectItem value="angry">Angry</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-1.5">
                    <Label>Date Range</Label>
                    <Tabs
                        value={filters.dateRange}
                        onValueChange={(value) => handleValueChange('dateRange', value)}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All Time</TabsTrigger>
                            <TabsTrigger value="month">This Month</TabsTrigger>
                            <TabsTrigger value="week">This Week</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
            <div className="flex items-center space-x-2 pt-4 md:pt-0">
                <Label htmlFor="sort-order" className="text-sm">Oldest</Label>
                <Switch
                    id="sort-order"
                    checked={filters.sort === 'newest'}
                    onCheckedChange={(checked) => handleValueChange('sort', checked ? 'newest' : 'oldest')}
                />
                <Label htmlFor="sort-order" className="text-sm font-medium">Newest</Label>
            </div>
        </div>
    );
}
