import { clsx } from "clsx";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({
    children,
    className,
    id,
}: SectionWrapperProps) {
    return (
        <section id={id} className={clsx("py-12 md:py-32 px-4 md:px-6", className)}>
            <div className="container mx-auto max-w-6xl">{children}</div>
        </section>
    );
}
