"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Gemini API Configuration
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAmP2jEFRjhUAWkFkubjkwUgYoZLvSkrus';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent';

const SYSTEM_CONTEXT = `You are a helpful assistant for a healthcare clinic that provides Ayurvedic, Dental, and Skincare services. 

Your role is to:
- Answer questions about our services, treatments, and procedures
- Provide information about appointment booking
- Explain treatment options and their benefits
- Share clinic hours, location (Pune, Maharashtra), and contact information
- Be professional, empathetic, and helpful
- Recommend booking an appointment for specific medical advice
- Never provide specific medical diagnoses or treatment advice

Clinic Services:
- Ayurvedic Treatments: Panchakarma, Herbal remedies, Wellness therapies
- Dental Services: Cleanings, Fillings, Cosmetic dentistry, Orthodontics
- Skincare: Acne treatment, Anti-aging, Chemical peels, Laser treatments

Be concise, friendly, and professional in all responses.`;

interface Message {
    role: 'bot' | 'user';
    text: string;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: "Hello! Welcome to our clinic. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Debug: List available models
    useEffect(() => {
        const checkModels = async () => {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
                const data = await response.json();
                console.log("Available Gemini Models:", data);
            } catch (e) {
                console.error("Failed to list models:", e);
            }
        };
        checkModels();
    }, []);

    const sendMessageToGemini = async (userMessage: string, history: Message[]) => {
        try {
            // Convert history to Gemini format
            const historyParts = history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const payload = {
                contents: [
                    { role: 'user', parts: [{ text: SYSTEM_CONTEXT }] },
                    { role: 'model', parts: [{ text: 'Understood. I will assist patients with information about our clinic services professionally and helpfully.' }] },
                    ...historyParts,
                    { role: 'user', parts: [{ text: userMessage }] }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                ]
            };

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log("Gemini API Response:", data); // Debug log

            if (data.error) {
                console.error("Gemini API Error details:", data.error);
                throw new Error(data.error.message || 'API Error');
            }

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected response structure:", data);
                // Handle safety ratings blocking response
                if (data.promptFeedback && data.promptFeedback.blockReason) {
                    return "I apologize, but I cannot answer that question due to safety guidelines.";
                }
                throw new Error('Invalid response from Gemini API');
            }
        } catch (error: any) {
            console.error('Gemini API Integration Error:', error);
            // Return a friendly message instead of crashing
            return `System Error: ${error.message || "Unavailable"}. Please contact support.`;
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        const botResponse = await sendMessageToGemini(userMsg, messages);

        setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-neutral-100 z-50 flex flex-col overflow-hidden max-h-[600px] h-[70vh]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-soft-blue to-purple-600 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Sparkles size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Clinic Assistant</h3>
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-off-white/50 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-soft-blue to-purple-600 text-white rounded-br-none'
                                            : 'bg-white text-dark-charcoal border border-neutral-100 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-neutral-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                                        <span className="w-2 h-2 bg-soft-blue/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-2 h-2 bg-soft-blue/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-2 h-2 bg-soft-blue/40 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-neutral-100 shrink-0">
                            <div className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about treatments, appointments..."
                                    className="flex-1 bg-light-gray text-dark-charcoal rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-soft-blue/20 transition-all placeholder:text-muted-charcoal/60"
                                    disabled={isLoading}
                                    suppressHydrationWarning
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="bg-soft-blue text-white p-3 rounded-xl hover:bg-soft-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-md shadow-soft-blue/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-muted-charcoal/60">
                                    Powered by AI • Information is for reference only
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-soft-blue to-purple-600 hover:shadow-lg hover:shadow-soft-blue/25 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 group"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="relative"
                        >
                            <MessageCircle size={28} />

                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </>
    );
}
