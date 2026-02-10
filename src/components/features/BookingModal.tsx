"use client";

import React from "react";
import { useBooking } from "@/context/BookingContext";
import { BookingFormContent } from "./BookingFormContent";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookingModal() {
    const { isOpen, closeBooking } = useBooking();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-xl font-semibold text-dark-charcoal">Book your appointment</h2>
                                    <p className="text-sm text-muted-charcoal">We'll confirm within 2 hours</p>
                                </div>
                                <button
                                    onClick={closeBooking}
                                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-muted-charcoal"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <BookingFormContent onSuccess={() => setTimeout(closeBooking, 2000)} />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
