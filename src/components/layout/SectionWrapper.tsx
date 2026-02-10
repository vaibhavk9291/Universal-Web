import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    containerClassName?: string;
}

export function SectionWrapper({
    children,
    className,
    containerClassName,
    ...props
}: SectionWrapperProps) {
    return (
        <section className={cn("py-16 md:py-24", className)} {...props}>
            <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
                {children}
            </div>
        </section>
    );
}
