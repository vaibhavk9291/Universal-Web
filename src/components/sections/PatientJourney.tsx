"use client";

import React from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BookOpen, HelpCircle, Calendar, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        icon: BookOpen,
        title: "Understand Your Needs",
        description: "Browse treatments, read real information, watch explanation videos.",
    },
    {
        icon: HelpCircle,
        title: "Clear Your Doubts",
        description: "Use our chatbot or call us to ask specific questions.",
    },
    {
        icon: Calendar,
        title: "Book Your Visit",
        description: "Choose a convenient time, get instant confirmation.",
    },
    {
        icon: UserCheck,
        title: "Receive Personalized Care",
        description: "Meet our doctors, discuss your plan, start your treatment.",
    },
];

export function PatientJourney() {
    return (
        <div className="bg-off-white" id="process">
            <SectionWrapper>
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                    {/* Header */}
                    <div className="md:w-1/3 md:sticky md:top-32 h-fit">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-semibold text-dark-charcoal mb-4"
                        >
                            Your journey with us
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-charcoal text-lg"
                        >
                            From understanding your needs to leaving with results. We've simplified healthcare to put you in control.
                        </motion.p>
                    </div>

                    {/* Timeline */}
                    <div className="md:w-2/3 relative pl-8 md:pl-12 border-l-2 border-slate-200">
                        {/* Timeline Steps */}
                        <div className="space-y-16">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    {/* Dot */}
                                    <span className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 rounded-full bg-soft-blue border-4 border-white shadow-sm flex items-center justify-center">
                                        <span className="w-2 h-2 rounded-full bg-white" />
                                    </span>

                                    {/* Content */}
                                    <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
                                        <div className="p-4 bg-white shadow-sm rounded-xl text-soft-blue shrink-0">
                                            <step.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-dark-charcoal mb-2">
                                                {index + 1}. {step.title}
                                            </h3>
                                            <p className="text-muted-charcoal">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
