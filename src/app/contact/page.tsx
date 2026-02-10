"use client";

import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Contact } from "@/components/sections/Contact";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-primary-white">
            <PageHeader
                title="Contact Us"
                description="We are here to help you. Reach out to us for appointments or queries."
                backgroundImage="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=2000"
            />
            <Contact />
        </main>
    );
}
