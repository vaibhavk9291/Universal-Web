"use client";

import React from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Stethoscope, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
    {
        icon: Stethoscope,
        title: "Experienced Doctors",
        subtitle: "Board-certified professionals",
    },
    {
        icon: ShieldCheck,
        title: "Safe Procedures",
        subtitle: "Clinic-grade hygiene standards",
    },
    {
        icon: Clock,
        title: "Transparent Process",
        subtitle: "Know what to expect, step by step",
    },
    {
        icon: MessageSquare,
        title: "Clear Communication",
        subtitle: "Questions answered before you book",
    },
];

export function TrustIndicators() {
    return (
        <div className="bg-light-gray border-y border-neutral-100">
            <SectionWrapper className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center space-y-3"
                        >
                            <div className="p-3 bg-white rounded-full shadow-sm text-sage-green">
                                <item.icon size={28} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-charcoal text-lg">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-charcoal">
                                    {item.subtitle}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
