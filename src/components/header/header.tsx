import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { background } from "./animation";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ToggleTheme from "../theme/toggle_theme";
import { mergeClass } from "../../libs/utils";
import { config } from "../../data/config";
import Nav from "./nav";
import styles from "./style.module.scss";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <motion.header
      className={mergeClass(
        styles.header,
        "z-[9] fixed top-0 w-full px-3 sm:px-6 py-3 sm:py-4 backdrop-blur-md"
        // "z-[9] fixed w-full box-border px-4 sm:px-5 py-[15px] sm:py-[20px] backdrop-blur-[12px] transition-colors delay-100 duration-500 ease-in"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .6)" : "transparent",
      }}
      
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0.5, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      <div className={mergeClass(styles.bar, "flex items-center justify-between")}>
        <Link to="/" className="flex items-center justify-center">
            <Button variant={"link"} className="text-md">
                {config.author}
            </Button>
        </Link>

        <div className="flex items-center gap-6">
        <ToggleTheme className="w-10 h-10" />
        <Button
            variant="ghost"
            onClick={() => setIsActive(!isActive)}
            className={mergeClass(
            styles.el,
            "w-10 h-10 p-0 m-0 flex items-center justify-center bg-transparent"
            )}
        >
            {isActive ? (
            <X className="w-6 h-6 transition-transform duration-500 ease-in-out" />
            ) : (
            <Menu className="w-6 h-6 transition-transform duration-500 ease-in-out" />
            )}
        </Button>
        </div>
        </div>
        <motion.div
            variants={background}
            initial="initial"
            animate={isActive ? "open" : "closed"}
            className={styles.background}
            >
        </motion.div>
        <AnimatePresence mode="wait">
            {isActive && <Nav setIsActive={setIsActive} />}
        </AnimatePresence>
    </motion.header>
  );
};

export default Header;
