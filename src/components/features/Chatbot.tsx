"use client";

import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

// Gemini API Configuration
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAmP2jEFRjhUAWkFkubjkwUgYoZLvSkrus';
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent';

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

const CLINIC_KNOWLEDGE = `
Clinic Name: AyuSmile Wellness Clinic
Location: Pune, Maharashtra
Timings: Monday to Saturday, 9:00 AM to 7:00 PM
Contact: +91-9876543210
Email: care@ayusmileclinic.com

--- SERVICES ---

Ayurvedic Treatments:
- Panchakarma Therapy (₹12,000)
- Herbal Detox (₹3,500)
- Stress Relief Therapy (₹4,500)

Dental Services:
- Dental Cleaning (₹1,200)
- Tooth Filling (₹1,800)
- Root Canal Treatment (₹6,000)
- Braces (₹45,000)

Skincare Treatments:
- Acne Treatment (₹3,000)
- Chemical Peel (₹4,000)
- Laser Acne Treatment (₹7,500)
- Anti-Aging Therapy (₹6,500)

--- DOCTORS ---

Dr. Mehta (BAMS, 15 years experience - Ayurveda Specialist)
Dr. Sharma (BDS, Cosmetic Dentist - 10 years experience)
Dr. Kapoor (Dermatologist - 8 years experience)

Appointments:
- Booking available via phone call
- Walk-ins allowed based on availability
- Online booking coming soon
`;

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

    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY,
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendMessageToGemini = async (userMessage: string, history: Message[]) => {
        try {
            // Convert chat history into text conversation
            const conversationHistory = history
                .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`)
                .join("\n");

            const fullPrompt = `
                ${SYSTEM_CONTEXT}

                Clinic Knowledge Base:
                ${CLINIC_KNOWLEDGE}

                Conversation:
                ${conversationHistory}

                User: ${userMessage}
                Assistant:
                `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: fullPrompt,
                config: {
                    temperature: 0.6,
                    maxOutputTokens: 600,
                },
            });

            return response.text ?? "I'm sorry, I couldn't respond properly.";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Gemini SDK Error:", error);
            return "System Error. Please try again later.";
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
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-95 bg-white rounded-2xl shadow-2xl border border-neutral-100 z-50 flex flex-col overflow-hidden max-h-150 h-[70vh]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-linear-to-r from-soft-blue to-purple-600 text-white flex justify-between items-center shrink-0">
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
                                            ? 'bg-linear-to-r from-soft-blue to-purple-600 text-white rounded-br-none'
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
                suppressHydrationWarning
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-soft-blue to-purple-600 hover:shadow-lg hover:shadow-soft-blue/25 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 group"
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