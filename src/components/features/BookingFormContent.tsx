"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type FormData = {
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    concerns: string;
};

export function BookingFormContent({ onSuccess }: { onSuccess?: () => void }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        // Simulate API call
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        reset();
        if (onSuccess) onSuccess();
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8"
            >
                <div className="w-16 h-16 bg-sage-green/10 text-sage-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-semibold text-dark-charcoal mb-4">
                    Request Received!
                </h2>
                <p className="text-muted-charcoal mb-8">
                    We'll confirm via WhatsApp within 2 hours.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={handleReset}>
                        Book Another
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-charcoal">Your Name *</label>
                    <input
                        {...register("name", { required: true })}
                        suppressHydrationWarning
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50"
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-charcoal">Phone / WhatsApp *</label>
                    <input
                        {...register("phone", { required: true, pattern: /^[0-9+]+$/ })}
                        suppressHydrationWarning
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50"
                        placeholder="+91 98765 43210"
                    />
                    {errors.phone && <span className="text-xs text-red-500">Valid phone number is required</span>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-dark-charcoal">I'm interested in</label>
                <select
                    {...register("service", { required: true })}
                    suppressHydrationWarning
                    className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 bg-white"
                >
                    <option value="">Select a treatment category</option>
                    <option value="dental">Dental & Smile</option>
                    <option value="skin">Skin & Cosmetology</option>
                    <option value="ayurveda">Ayurveda & Wellness</option>
                    <option value="general">Consultation</option>
                </select>
                {errors.service && <span className="text-xs text-red-500">Please select a service</span>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-charcoal">Preferred Day</label>
                    <input
                        type="date"
                        {...register("date", { required: true })}
                        suppressHydrationWarning
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50"
                    />
                    {errors.date && <span className="text-xs text-red-500">Date is required</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-charcoal">Preferred Time</label>
                    <select
                        {...register("time", { required: true })}
                        suppressHydrationWarning
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 bg-white"
                    >
                        <option value="">Select time slot</option>
                        <option value="morning">Morning (9am - 12pm)</option>
                        <option value="afternoon">Afternoon (2pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                    </select>
                    {errors.time && <span className="text-xs text-red-500">Time is required</span>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-dark-charcoal">Any specific concerns? (Optional)</label>
                <textarea
                    {...register("concerns")}
                    suppressHydrationWarning
                    className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-soft-blue/50 min-h-[100px]"
                    placeholder="Tell us a bit about what you're looking for..."
                />
            </div>

            <p className="text-xs text-muted-charcoal bg-neutral-50 p-3 rounded">
                By booking, you agree to receive appointment confirmations via WhatsApp.
            </p>

            <Button type="submit" variant="premium" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    "Book Appointment"
                )}
            </Button>
        </form>
    );
}
