"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/919876543210" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            title="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
        </motion.a>
    );
}
