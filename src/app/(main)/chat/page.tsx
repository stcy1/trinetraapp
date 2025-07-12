"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Logo } from "@/components/logo";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to listen. What's on your mind today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: `Thank you for sharing that. It sounds like you're dealing with a lot. Can you tell me more about how that makes you feel?`,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };


  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 md:p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "ai" && (
                    <Avatar className="h-9 w-9 border">
                      <AvatarFallback>
                        <Logo className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xs rounded-lg p-3 text-sm md:max-w-md",
                      message.sender === "user"
                        ? "rounded-br-none bg-primary text-primary-foreground"
                        : "rounded-bl-none bg-secondary text-secondary-foreground"
                    )}
                  >
                    <p>{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-9 w-9 border">
                      <AvatarFallback>
                        <Logo className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-secondary text-secondary-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-0"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-150"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-300"></span>
                      </div>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="border-t bg-background p-4">
        <div className="relative">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="pr-12"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
