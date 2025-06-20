import gsap from "gsap";
import { useEffect, useRef, useState, type ReactNode } from "react"
import { PreloaderContext } from "../../hooks/usePreloader";
import { AnimatePresence } from "framer-motion";
import KeyboardLoader from "../../components/loader/keyboard_loader";

type PreloaderProps = {
    children: ReactNode;
    disabled?: boolean
};

const LOADING_TIME = 2.5;

export default function Preloader({ children, disabled = false }: PreloaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingPercent, setLoadingPercent] = useState(0);
    const loadingTween = useRef<gsap.core.Tween | null>(null);
    const loadingPercentRef = useRef< {value: number }> ( {value:0} );


    const bypassLoading = () => {
        loadingTween.current?.progress(0.99).kill();
        setLoadingPercent(100);
        setIsLoading(false);
    }

    useEffect(() => {
        if(disabled){
            bypassLoading();
            return;
        }

        loadingTween.current = gsap.to(loadingPercentRef.current, {
            value: 100,
            duration: LOADING_TIME,
            ease: "slow(0.7,0.7,false)",
            onUpdate: () => {
                setLoadingPercent(loadingPercentRef.current.value);
            },
            onComplete: () => {
                setIsLoading(false);
            },
        });
    }, []);

    return (
        <PreloaderContext.Provider value={ { isLoading, loadingPercent, bypassLoading} }>
            <AnimatePresence mode="wait">{isLoading && <KeyboardLoader/>}</AnimatePresence>
            {children}
        </PreloaderContext.Provider>
    )
}