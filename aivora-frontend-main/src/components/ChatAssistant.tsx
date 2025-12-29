"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Brain, BotMessageSquare } from "lucide-react";
import { supportChatAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DotsLoader } from "@/components/Loader";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{
        role: "assistant",
        content: "Hi! I'm your Aivora assistant. I can help you understand features like goals, daily progress, insights, and reports, or give you guidance on staying consistent. How can I help?",
    }]);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { isAuthenticated } = useAuthStore();

    const toggleOpen = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (!isOpen) return;
        const timeout = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return () => clearTimeout(timeout);
    }, [isOpen, messages.length]);

    const handleSend = async () => {
        if (!input.trim() || isSending) return;

        if (!isAuthenticated) {
            setError("Please log in to chat with the assistant.");
            return;
        }

        const userMessage: ChatMessage = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setError(null);
        setIsSending(true);

        try {
            const history = [...messages, userMessage];
            const { reply } = await supportChatAPI.send(userMessage.content, history);

            const assistantMessage: ChatMessage = {
                role: "assistant",

                content: reply || "I'm here to help with Aivora and your goals.",
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            console.error("Chat error", err);
            setError("Sorry, I couldn't reach the assistant. Please try again.");
        } finally {
            setIsSending(false);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating toggle button */}
            <div className="fixed bottom-5 right-5 z-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Button
                        variant="gradient"
                        size="lg"
                        className="rounded-full shadow-2xl flex items-center gap-2 px-5 py-3"
                        onClick={toggleOpen}
                    >
                        <BotMessageSquare className="w-7 h-7 animate-pulse" />
                    </Button>
                </motion.div>
            </div>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed z-50 inset-x-0 bottom-0 sm:inset-auto sm:bottom-24 sm:right-5 w-full sm:w-[400px]"
                    >
                        <Card className="glass-card border-border/60 shadow-2xl flex flex-col h-[62dvh] sm:h-[440px] rounded-t-2xl sm:rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full gradient-glow flex items-center justify-center text-xs font-semibold text-primary-foreground">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base flex items-center gap-1">
                                            Aivora Assistant
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground">
                                            Ask for help, tips, or guidance
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    animated={false}
                                    className="rounded-full h-8 w-8"
                                    onClick={toggleOpen}
                                    aria-label="Close assistant"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardHeader>

                            <CardContent className="flex flex-col flex-1 p-3 gap-2 overflow-hidden">
                                <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex w-full",
                                                msg.role === "user" ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                                                    msg.role === "user"
                                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isSending && (
                                        <div className="flex justify-start">
                                            <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-bl-sm px-3 py-2 text-sm flex items-center gap-2">
                                                <DotsLoader />
                                                <span>Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {error && (
                                    <p className="text-xs text-destructive px-1">{error}</p>
                                )}

                                <div className="mt-1 flex items-center justify-between gap-2">
                                    <textarea
                                        className="flex-1 resize-none rounded-2xl border-[1px] border-sky-400 bg-background/80 px-3 py-2 text-sm shadow-inner focus-visible:outline-none  min-h-[40px] max-h-[80px] leading-snug"
                                        placeholder={
                                            isAuthenticated
                                                ? "Ask how to use Aivora, improve your routine, or anything about your goals..."
                                                : "Log in to chat with the assistant."
                                        }
                                        rows={2}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={!isAuthenticated || isSending}
                                    />
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className="rounded-full h-10 w-10 flex-shrink-0"
                                        onClick={handleSend}
                                        disabled={!input.trim() || isSending || !isAuthenticated}
                                        aria-label="Send message"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
