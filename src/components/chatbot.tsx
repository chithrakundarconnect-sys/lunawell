"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Send, User, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { aiSelfCareChatbot } from "@/ai/flows/ai-self-care-chatbot";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { KikiAvatar } from "./icons";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

type ChatInput = z.infer<typeof chatSchema>;

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<ChatInput>({
    resolver: zodResolver(chatSchema),
  });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit: SubmitHandler<ChatInput> = async (data) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: data.message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    reset();
    
    try {
      const result = await aiSelfCareChatbot({ question: data.message });
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: result.answer,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-card border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-2 sm:p-4" ref={scrollAreaRef}>
        <div className="space-y-6 p-2 sm:p-0">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <KikiAvatar className="mx-auto h-24 w-24 animate-float" />
              <h3 className="mt-4 text-lg font-medium font-headline">Hi! I’m Kiki 💕</h3>
              <p className="text-sm">I’m here to help you take care of yourself. Ask me anything about women's health, wellness, and self-care.</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 bg-transparent">
                  <KikiAvatar />
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-md rounded-xl px-4 py-3 text-sm shadow-sm",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {message.text}
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <Avatar className="h-8 w-8 bg-transparent">
                  <KikiAvatar />
                </Avatar>
              <div className="bg-secondary rounded-xl px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-2 sm:p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
          <Input
            {...register("message")}
            placeholder="Ask Kiki a question..."
            autoComplete="off"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
