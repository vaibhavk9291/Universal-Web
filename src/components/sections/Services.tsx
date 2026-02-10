"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Sparkles, Sprout, X, Check, ArrowRight } from "lucide-react";

// Types
interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    details: {
        what: string;
        who: string[];
        result: string;
        faq: { q: string; a: string }[];
    };
}

const services: Service[] = [
    {
        id: "dental",
        title: "Smile Restoration",
        description: "Veneers, whitening, and alignment for a confident smile.",
        icon: Smile,
        details: {
            what: "Complete smile makeover using modern veneers and whitening technology. Custom designed for your facial structure.",
            who: ["Discolored teeth", "Chipped or worn teeth", "Gaps or misalignment"],
            result: "A brighter, uniform, and natural-looking smile in 2-3 visits.",
            faq: [
                { q: "Does it hurt?", a: "Minimal discomfort. Local anesthesia is used." },
                { q: "How long does it last?", a: "10-15 years with proper care." },
            ],
        },
    },
    {
        id: "skin",
        title: "Skin Rejuvenation",
        description: "Advanced facials and peels for glowing, healthy skin.",
        icon: Sparkles,
        details: {
            what: "Deep exfoliation and nourishment treatments to restore skin vitality.",
            who: ["Dull skin", "Fine lines", "Acne scars"],
            result: "Immediate glow and long-term texture improvement.",
            faq: [
                { q: "Is there downtime?", a: "None to minimal redness for 24h." },
                { q: "How many sessions?", a: "3-6 sessions recommended." },
            ],
        },
    },
    {
        id: "ayurveda",
        title: "Holistic Wellness",
        description: "Detox and rejuvenation therapies personalized for you.",
        icon: Sprout,
        details: {
            what: "Ancient Ayurvedic therapies including Panchakarma for deep detoxification.",
            who: ["Chronic stress", "Digestive issues", "Low energy"],
            result: "Restored balance, better sleep, and improved immunity.",
            faq: [
                { q: "Is it safe?", a: "Yes, uses natural herbal oils and preparations." },
                { q: "Dietary restrictions?", a: "Light vegetarian diet recommended during treatment." },
            ],
        },
    },
];

import { useBooking } from "@/context/BookingContext";

export function Services() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const { openBooking } = useBooking();

    return (
        <SectionWrapper id="treatments" className="bg-primary-white">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-dark-charcoal mb-4">
                    Treatments designed for you
                </h2>
                <p className="text-muted-charcoal text-lg">
                    Learn what each procedure involves, who it helps, and what results you can expect.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100 flex flex-col items-start transition-all hover:shadow-lg"
                    >
                        <div className="w-12 h-12 bg-light-gray rounded-lg flex items-center justify-center text-muted-charcoal mb-6">
                            <service.icon size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-charcoal mb-2">
                            {service.title}
                        </h3>
                        <p className="text-muted-charcoal mb-8 flex-grow">
                            {service.description}
                        </p>
                        <Button
                            variant="ghost"
                            className="p-0 h-auto font-medium text-soft-blue hover:text-soft-blue/80 hover:bg-transparent"
                            onClick={() => setSelectedService(service)}
                        >
                            Learn More <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="absolute inset-0 bg-dark-charcoal/40 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`service-${selectedService.id}`}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 md:p-10"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 text-muted-charcoal hover:text-dark-charcoal p-2 bg-light-gray rounded-full"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8">
                                <span className="text-soft-blue font-medium text-sm tracking-uppercase mb-2 block">
                                    SERVICE DETAIL
                                </span>
                                <h3 className="text-3xl font-semibold text-dark-charcoal mb-4">
                                    {selectedService.title}
                                </h3>
                                <div className="h-1 w-20 bg-sage-green/50 rounded-full" />
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <h4 className="text-lg font-medium text-dark-charcoal mb-2">What is this treatment?</h4>
                                    <p className="text-muted-charcoal leading-relaxed">{selectedService.details.what}</p>
                                </section>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <section>
                                        <h4 className="text-lg font-medium text-dark-charcoal mb-3">Who is this suitable for?</h4>
                                        <ul className="space-y-2">
                                            {selectedService.details.who.map((item, i) => (
                                                <li key={i} className="flex items-start text-muted-charcoal text-sm">
                                                    <Check className="w-4 h-4 text-sage-green mr-2 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                    <section>
                                        <h4 className="text-lg font-medium text-dark-charcoal mb-3">Expected Results</h4>
                                        <div className="p-4 bg-muted-beige/50 rounded-lg text-dark-charcoal text-sm leading-relaxed">
                                            {selectedService.details.result}
                                        </div>
                                    </section>
                                </div>

                                <div className="border-t border-light-gray pt-6">
                                    <h4 className="text-lg font-medium text-dark-charcoal mb-4">Common Questions</h4>
                                    <div className="space-y-4">
                                        {selectedService.details.faq.map((q, i) => (
                                            <div key={i}>
                                                <p className="font-medium text-dark-charcoal text-sm mb-1">Q: {q.q}</p>
                                                <p className="text-muted-charcoal text-sm">A: {q.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button variant="premium" className="flex-1" onClick={() => { setSelectedService(null); openBooking(); }}>
                                        Book This Treatment
                                    </Button>
                                    <Button variant="outline" className="flex-1" onClick={() => setSelectedService(null)}>
                                        Ask a Question
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
