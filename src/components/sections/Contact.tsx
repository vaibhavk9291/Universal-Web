"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";

type FormData = {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    date: string;
    message: string;
};

export function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
        setIsSubmitting(false);
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
    };

    return (
        <SectionWrapper id="contact" className="bg-primary-white">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-100">
                        <h2 className="text-3xl font-bold text-dark-charcoal mb-2">Get in Touch</h2>
                        <p className="text-muted-charcoal mb-8">
                            Fill out the form below to book an appointment or ask a question.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-charcoal">Full Name</label>
                                    <input
                                        {...register("name", { required: "Name is required" })}
                                        suppressHydrationWarning
                                        className="w-full px-4 py-3 rounded-lg border border-light-gray focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-charcoal">Phone Number</label>
                                    <input
                                        {...register("phone", {
                                            required: "Phone is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Please enter a valid 10-digit number"
                                            }
                                        })}
                                        suppressHydrationWarning
                                        className="w-full px-4 py-3 rounded-lg border border-light-gray focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all"
                                        placeholder="9876543210"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-dark-charcoal">Email Address</label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg border border-light-gray focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-charcoal">Service Type</label>
                                    <select
                                        {...register("serviceType")}
                                        suppressHydrationWarning
                                        className="w-full px-4 py-3 rounded-lg border border-light-gray focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all bg-white"
                                    >
                                        <option value="General Consultation">General Consultation</option>
                                        <option value="Ayurvedic">Ayurvedic Treatment</option>
                                        <option value="Dental">Dental Care</option>
                                        <option value="Skincare">Skincare</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-dark-charcoal">Preferred Date</label>
                                    <input
                                        type="datetime-local"
                                        {...register("date")}
                                        suppressHydrationWarning
                                        className="w-full px-4 py-3 rounded-lg border border-light-gray focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all text-muted-charcoal"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-dark-charcoal">Message</label>
                                <textarea
                                    {...register("message")}
                                    rows={4}
                                    suppressHydrationWarning
                                    className="w-full px-4 py-3 rounded-lg border border-light-gray focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all resize-none"
                                    placeholder="Tell us about your symptoms or requirements..."
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-soft-blue to-purple-600 hover:from-soft-blue/90 hover:to-purple-600/90 shadow-lg shadow-soft-blue/30"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>

                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium animate-fade-in">
                                    Message sent successfully! We will contact you soon.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div className="bg-dark-charcoal rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <MapPin className="text-soft-blue" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Our Location</p>
                                        <p className="text-neutral-300">Pune, Maharashtra</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <Phone className="text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Phone Number</p>
                                        <p className="text-neutral-300">+91-98765-43210</p>
                                        <p className="text-neutral-400 text-sm">Mon-Sat 9am-6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <Mail className="text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Email Us</p>
                                        <p className="text-neutral-300">care@medclinic.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <Clock className="text-yellow-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Working Hours</p>
                                        <p className="text-neutral-300">Mon - Sat: 09:00 AM - 08:00 PM</p>
                                        <p className="text-neutral-400">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 h-[300px] relative bg-neutral-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360174427!2d73.79969254697107!3d18.52461169077715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Clinic Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
