import Logo from "@/components/ui/Logo";

export default function Footer() {
    return (
        <footer className="py-12 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 mt-20">
            <div className="container mx-auto px-6 text-center text-stone-500 dark:text-stone-400 flex flex-col items-center">
                <Logo className="w-32 h-auto mb-4 text-foreground" />
                <p className="mb-6 text-sm">
                    2008년부터 이어온 조형 예술의 장인정신
                </p>
                <p className="text-xs opacity-60">
                    &copy; {new Date().getFullYear()} Well Made. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
