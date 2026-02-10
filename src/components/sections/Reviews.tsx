"use client";

import React from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "Priya M.",
        treatment: "Skin Treatment",
        date: "Dec 2024",
        text: "Clear explanation about the procedure, no pressure to decide immediately. The doctor took time to answer all my questions.",
        rating: 5,
    },
    {
        name: "Rahul S.",
        treatment: "Dental Care",
        date: "Jan 2025",
        text: "Reviewing my options was made so easy. The clinic is pristine and the staff makes you feel at ease immediately.",
        rating: 5,
    },
    {
        name: "Anjali K.",
        treatment: "Ayurvedic Detox",
        date: "Nov 2024",
        text: "A truly holistic experience. I understood exactly what the treatment entailed before starting. Highly recommended.",
        rating: 5,
    },
];

const doctors = [
    {
        name: "Dr. Sharma",
        creds: "BDS, MDS (Orthodontics)",
        exp: "12 years of experience",
        // image: "/path/to/doc1.jpg"
    },
    {
        name: "Dr. Verma",
        creds: "BAMS, Ayurvedic Specialist",
        exp: "15 years of practice",
        // image: "/path/to/doc2.jpg"
    },
];

import Image from "next/image";

export function Reviews() {
    return (
        <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/medical-bg.png"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-40 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-light-gray via-light-gray/90 to-light-gray" />
            </div>

            <SectionWrapper id="reviews" className="relative z-10 bg-transparent">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-dark-charcoal mb-4">
                        What our patients say
                    </h2>
                    <p className="text-muted-charcoal text-lg">
                        Real experiences from people who've trusted us with their care.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-100"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[...Array(review.rating)].map((_, j) => (
                                    <Star key={j} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-dark-charcoal font-medium leading-relaxed mb-6 italic">
                                "{review.text}"
                            </p>
                            <div>
                                <p className="font-semibold text-dark-charcoal">{review.name}</p>
                                <p className="text-sm text-muted-charcoal">
                                    {review.treatment}, {review.date}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Doctors Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-semibold text-dark-charcoal">Meet Our Team</h3>
                        <div className="h-1 w-16 bg-soft-blue mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {doctors.map((doc, i) => (
                            <div key={i} className="flex items-center gap-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-sm border border-neutral-100 transition-transform hover:scale-[1.02]">
                                <div className="w-24 h-24 bg-neutral-200 rounded-full flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-bold text-dark-charcoal">{doc.name}</h4>
                                    <p className="text-soft-blue font-medium">{doc.creds}</p>
                                    <p className="text-sm text-muted-charcoal mt-1">{doc.exp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
