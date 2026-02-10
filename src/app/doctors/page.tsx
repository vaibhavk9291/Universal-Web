import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DoctorsList } from "@/components/sections/DoctorsList";

export default function DoctorsPage() {
    return (
        <main className="min-h-screen bg-primary-white">
            <PageHeader
                title="Our Medical Experts"
                description="Meet our team of highly qualified and experienced doctors dedicated to your health."
                backgroundImage="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000"
            />
            <DoctorsList />
        </main>
    );
}
