"use client";

import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const servicesList = [
    {
        category: "Dental Care",
        items: [
            {
                title: "Teeth Whitening",
                price: "$200",
                description: "Professional whitening for a brighter smile in one session.",
                features: ["1 Hour Session", "Instant Results", "Safe & Painless"]
            },
            {
                title: "Dental Implants",
                price: "$1200+",
                description: "Permanent solution for missing teeth with natural look and feel.",
                features: ["Lifetime Warranty", "Titanium Post", "Natural Appearance"]
            },
            {
                title: "Invisalign",
                price: "$3500+",
                description: "Clear aligners to straighten your teeth without braces.",
                features: ["Invisible", "Removable", "Comfortable"]
            }
        ]
    },
    {
        category: "Skincare",
        items: [
            {
                title: "HydraFacial",
                price: "$150",
                description: "Deep cleansing and hydration for glowing skin.",
                features: ["Exfoliation", "Hydration", "No Downtime"]
            },
            {
                title: "Chemical Peel",
                price: "$120",
                description: "Skin resurfacing treatment for acne and fine lines.",
                features: ["Improves Texture", "Reduces Scars", "Radiant Skin"]
            },
            {
                title: "Laser Hair Removal",
                price: "$80+",
                description: "Long-term hair reduction for smooth skin.",
                features: ["FDA Approved", "All Skin Types", "Quick Sessions"]
            }
        ]
    },
    {
        category: "Ayurveda",
        items: [
            {
                title: "Panchakarma",
                price: "$500",
                description: "Complete detoxification and rejuvenation therapy.",
                features: ["Body Detox", "Stress Relief", "Immunity Boost"]
            },
            {
                title: "Abhyanga",
                price: "$90",
                description: "Traditional full body oil massage.",
                features: ["Relaxation", "Joint Health", "Better Sleep"]
            },
            {
                title: "Shirodhara",
                price: "$100",
                description: "Soothing oil treatment for the head and nervous system.",
                features: ["Mental Clarity", "Headache Relief", "Anxiety Reduction"]
            }
        ]
    }
];

export default function ServicesPage() {
    const { openBooking } = useBooking();

    return (
        <main className="min-h-screen bg-primary-white">
            <PageHeader
                title="Our Premium Services"
                description="Explore our wide range of treatments tailored to enhance your health and beauty."
                backgroundImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Services List */}
            <div className="py-20 container mx-auto px-4 md:px-6">
                {servicesList.map((category, idx) => (
                    <div key={idx} className="mb-20 last:mb-0">
                        <h2 className="text-3xl font-bold text-dark-charcoal mb-8 border-l-4 border-soft-blue pl-4">
                            {category.category}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {category.items.map((service, sIdx) => (
                                <div key={sIdx} className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 hover:shadow-xl transition-all group">
                                    <h3 className="text-xl font-bold text-dark-charcoal mb-2">{service.title}</h3>
                                    <div className="text-3xl font-bold text-soft-blue mb-4">{service.price}</div>
                                    <p className="text-muted-charcoal mb-6 text-sm">{service.description}</p>

                                    <ul className="mb-8 space-y-3">
                                        {service.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center text-sm text-dark-charcoal">
                                                <div className="p-1 rounded-full bg-green-100 text-green-600 mr-3">
                                                    <Check size={12} />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button className="w-full group-hover:bg-soft-blue group-hover:text-white transition-colors" variant="outline" onClick={openBooking}>
                                        Book Now <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pricing Note */}
            <section className="bg-off-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-muted-charcoal">
                        * Prices are indicative and may vary based on individual consultation and treatment complexity.
                    </p>
                </div>
            </section>

            <FAQ />
        </main>
    );
}
