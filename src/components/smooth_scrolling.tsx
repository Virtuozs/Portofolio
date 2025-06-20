import ReactLenis, { useLenis } from "lenis/react";
import React, { useEffect, type ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
    isInsideModal?: boolean;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({children, isInsideModal = false}) => {
    const lenis = useLenis(() => {

    });

    useEffect(() => {
        lenis?.stop();
        lenis?.start();
    }, [lenis]);

    return (
        <ReactLenis
        root
        options={{
            duration: 2,
            prevent: (node) => {
            if (isInsideModal) return true;
            return node.classList.contains("modall");
            },
        }}
        >
        {children}
        </ReactLenis>
    );
};
