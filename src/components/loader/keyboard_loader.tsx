import { motion, type Variants } from "framer-motion";
import { usePreloader } from "../../hooks/usePreloader";

const letters = ["L", "O", "A", "D", "I", "N", "G", ".", "."];

const keyVariants: Variants = {
    initial: {scale: 0.9, opacity: 0.3},
    active: {
        scale: 1.1,
        opacity: 1,
        transition: {type: "spring", stiffness: 300},
    },
};

export default function KeyboardLoader() {
    const { loadingPercent } = usePreloader();
    const activeKeys = Math.floor((loadingPercent / 100) * letters.length);

    return(
        <div className="h-screen flex flex-col justify-center items-center bg-transparent text-white font-mono">
            <div className="grid grid-cols-3 gap-4 mb-6">
                {letters.map((char, index) => (
                <motion.div
                    key={index}
                    // className="w-16 h-16 rounded-lg bg-transparent text-black text-2xl flex items-center justify-center shadow-2xl border-1"
                    className="w-16 h-16 rounded-lg bg-gray-50 text-gray-900 text-2xl font-bold
                    flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]
                    border border-gray-300"
                    variants={keyVariants}
                    initial="initial"
                    animate={index < activeKeys ? "active" : "initial"}
                >
                    {char}
                </motion.div>
                ))}
            </div>
        </div>
    )
}