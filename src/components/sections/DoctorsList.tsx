"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Star, Calendar } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const doctors = [
    {
        id: 1,
        name: "Dr. Anjali Sharma",
        role: "Ayurvedic Specialist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
        qualification: "BAMS, MD (Ayurveda)",
        experience: "12+ Years Experience",
        specialization: ["Panchakarma", "Lifestyle Disorders", "Women's Health"]
    },
    {
        id: 2,
        name: "Dr. Rajesh Gupta",
        role: "Senior Dentist",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
        qualification: "BDS, MDS (Orthodontics)",
        experience: "15+ Years Experience",
        specialization: ["Cosmetic Dentistry", "Implants", "Root Canal"]
    },
    {
        id: 3,
        name: "Dr. Priya Deshmukh",
        role: "Dermatologist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        qualification: "MBBS, MD (Dermatology)",
        experience: "8+ Years Experience",
        specialization: ["Acne Treatment", "Anti-aging", "Laser Therapy"]
    },
    {
        id: 4,
        name: "Dr. Vikram Singh",
        role: "General Physician",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        qualification: "MBBS, MD (Medicine)",
        experience: "10+ Years Experience",
        specialization: ["General Health", "Chronic Disease Management"]
    }
];

export function DoctorsList() {
    const { openBooking } = useBooking();

    return (
        <section className="py-20 bg-off-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-bold text-dark-charcoal">4.9</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-dark-charcoal mb-1">{doctor.name}</h3>
                                <p className="text-soft-blue font-medium text-sm mb-3">{doctor.role}</p>

                                <div className="space-y-2 mb-6">
                                    <div className="text-sm text-muted-charcoal">
                                        <span className="font-semibold text-dark-charcoal">Qualification:</span> {doctor.qualification}
                                    </div>
                                    <div className="text-sm text-muted-charcoal">
                                        <span className="font-semibold text-dark-charcoal">Experience:</span> {doctor.experience}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {doctor.specialization.map((spec, i) => (
                                        <span key={i} className="text-xs bg-light-gray text-muted-charcoal px-2 py-1 rounded-md">
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                <Button
                                    className="w-full gap-2"
                                    variant="outline"
                                    onClick={openBooking}
                                >
                                    <Calendar size={16} />
                                    Book Appointment
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
