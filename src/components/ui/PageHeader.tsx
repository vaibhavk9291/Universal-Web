"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    description: string;
    backgroundImage?: string;
}

export function PageHeader({ title, description, backgroundImage }: PageHeaderProps) {
    return (
        <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-soft-blue/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#4A90E2_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Optional Background Image Overlay */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-dark-charcoal mb-4"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-muted-charcoal max-w-2xl mx-auto"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
}
