import React from "react";
import Link from "next/link";
import { div } from "framer-motion/client";

export function Footer() {
    return (
        <footer className="bg-dark-charcoal text-white pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">MedClinic</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Our philosophy is simple: informed patients make better health decisions.
                            We believe in transparency, patience, and lasting results.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li><Link href="#treatments" className="hover:text-soft-blue transition-colors">Treatments</Link></li>
                            <li><Link href="#process" className="hover:text-soft-blue transition-colors">How It Works</Link></li>
                            <li><Link href="#book" className="hover:text-soft-blue transition-colors">Book Appointment</Link></li>
                            <li><Link href="#contact" className="hover:text-soft-blue transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact</h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>Phone: +91-98765-43210</li>
                            <li>Email: care@clinic.com</li>
                            <li>Hours: Mon-Sat, 9am-8pm</li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Legal</h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li><Link href="#" className="hover:text-soft-blue transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-soft-blue transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-soft-blue transition-colors">Medical Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-sm text-neutral-500">
                    <p>© 2025 MedClinic. All rights reserved.</p>
                    <p className="mt-2">Results may vary. Consult a doctor for personalized advice.</p>
                </div>
            </div>
        </footer>
    );
}
