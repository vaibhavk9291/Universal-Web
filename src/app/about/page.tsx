import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Award, Heart, Users, Calendar } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-primary-white">
            <PageHeader
                title="About Our Clinic"
                description="Dedicated to providing holistic and advanced healthcare services with a patient-first approach."
            />

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-dark-charcoal">
                                Combining Tradition with Modern Medicine
                            </h2>
                            <p className="text-muted-charcoal leading-relaxed">
                                Founded in 2010, our clinic has grown from a small practice to a comprehensive healthcare center offering Ayurvedic, Dental, and Skincare treatments under one roof. We believe in treating the person, not just the disease.
                            </p>
                            <p className="text-muted-charcoal leading-relaxed">
                                Our mission is to make high-quality, personalized healthcare accessible to everyone. Whether you seek the ancient wisdom of Ayurveda or modern dental aesthetics, our expert team is here to guide you.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-soft-blue/10 rounded-full text-soft-blue">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-charcoal">Certified</h4>
                                        <p className="text-sm text-muted-charcoal">Experts</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-charcoal">Patient</h4>
                                        <p className="text-sm text-muted-charcoal">Centric</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            {/* Use Unsplash placeholder for clinic interior */}
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                                alt="Clinic Interior"
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-soft-blue text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold">15+</div>
                            <div className="text-white/80">Years Experience</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold">10k+</div>
                            <div className="text-white/80">Happy Patients</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold">25+</div>
                            <div className="text-white/80">Expert Doctors</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold">50+</div>
                            <div className="text-white/80">Awards Won</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Preview */}
            <section className="py-20 bg-off-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold text-dark-charcoal mb-4">Meet Our Experts</h2>
                    <p className="text-muted-charcoal max-w-2xl mx-auto mb-12">
                        Our team of dedicated professionals is committed to your well-being.
                    </p>
                    {/* CTA to Doctors Page */}
                    <Button variant="outline" className="mt-8" asChild>
                        <a href="/doctors">View All Doctors</a>
                    </Button>
                </div>
            </section>
        </main>
    );
}
