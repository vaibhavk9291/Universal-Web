"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useBooking } from "@/context/BookingContext";

export function Hero() {
    const { openBooking } = useBooking();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary-white">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/40 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
                    alt="Clinic Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            <SectionWrapper className="relative z-10 w-full pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                    {/* Left Content */}
                    <div className="space-y-8 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-soft-blue/10 rounded-full text-soft-blue font-medium text-sm"
                        >
                            <Star size={14} className="fill-soft-blue" />
                            <span>Rated #1 Clinic in Pune</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark-charcoal leading-[1.1] tracking-tight"
                        >
                            Advanced Care for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-blue to-green-400">
                                Body & Smile
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-muted-charcoal leading-relaxed max-w-lg"
                        >
                            Experience the perfect blend of modern dentistry, advanced skincare, and authentic Ayurveda.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-soft-blue to-purple-600 hover:scale-105 transition-transform shadow-xl shadow-soft-blue/20" onClick={openBooking}>
                                Book Appointment
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-neutral-50" asChild>
                                <a href="/services">Our Services</a>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-center gap-8 pt-8 text-sm font-medium text-muted-charcoal"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex text-yellow-400 gap-0.5">
                                    <Star className="fill-yellow-400" size={16} />
                                    <Star className="fill-yellow-400" size={16} />
                                    <Star className="fill-yellow-400" size={16} />
                                    <Star className="fill-yellow-400" size={16} />
                                    <Star className="fill-yellow-400" size={16} />
                                </div>
                                <p>500+ Happy Patients</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image/Graphic */}
                    <div className="relative hidden lg:block h-[650px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-soft-blue/5 rounded-[40px] rotate-3"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-white rounded-[40px] shadow-2xl overflow-hidden"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000"
                                alt="Doctor"
                                fill
                                className="object-cover"
                            />

                            {/* Floating Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-[200px]"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                        <ArrowRight rotate={-45} size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-charcoal">Recovery</p>
                                        <p className="font-bold text-dark-charcoal">Fast & Safe</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
