"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const defaultFAQs: FAQItem[] = [
    {
        question: "How do I book an appointment?",
        answer: "You can book an appointment easily through our website by clicking the 'Book Appointment' button. Alternatively, you can call our clinic directly."
    },
    {
        question: "What insurance plans do you accept?",
        answer: "We accept most major insurance plans. Please contact our front desk for a specific list of covered providers."
    },
    {
        question: "Do you offer emergency services?",
        answer: "Yes, we have slots reserved for dental emergencies. Please call us immediately if you are in pain."
    },
    {
        question: "What are your operating hours?",
        answer: "We are open Monday to Saturday from 9:00 AM to 8:00 PM. We are closed on Sundays."
    }
];

export function FAQ({ items = defaultFAQs }: { items?: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <h2 className="text-3xl font-bold text-dark-charcoal text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border border-light-gray rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 bg-white text-left focus:outline-none"
                            >
                                <span className="font-semibold text-dark-charcoal text-lg">{item.question}</span>
                                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-soft-blue text-white' : 'bg-light-gray text-muted-charcoal'}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 pt-0 text-muted-charcoal leading-relaxed bg-white border-t border-transparent">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
