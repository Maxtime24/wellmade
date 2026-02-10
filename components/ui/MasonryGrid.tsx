"use client";

import Masonry from "react-masonry-css";
import { ReactNode } from "react";
import { clsx } from "clsx";

interface MasonryGridProps {
    children: ReactNode;
    className?: string;
    columnClassName?: string;
}

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
};

export default function MasonryGrid({ children, className, columnClassName }: MasonryGridProps) {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={clsx("flex w-auto -ml-8", className)}
            columnClassName={clsx("pl-8 bg-clip-padding", columnClassName)}
        >
            {children}
        </Masonry>
    );
}
