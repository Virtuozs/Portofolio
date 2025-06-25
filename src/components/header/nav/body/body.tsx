import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { NavLink } from "../../config";
import { links as navLinks } from "../../config";
import { Link, useLocation } from "react-router-dom";
import { translate, blur } from "../../animation";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: NavLink[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links = navLinks,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const location = useLocation();
  const [currentHref, setCurrentHref] = useState("/");

  useEffect(() => {
    const { pathname, hash } = location;
    setCurrentHref(pathname + hash);

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);

  const getChars = (word: string) =>
    word.split("").map((char, i) => (
      <motion.span
        className="pointer-events-none"
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
      >
        {char}
      </motion.span>
    ));

  return (
    <div className="flex flex-wrap mt-10 lg:mt-20 lg:max-w-[1200px] flex-col items-end md:flex-row">
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <Link
            key={`l_${index}`}
            to={href}
            className="cursor-pointer uppercase no-underline text-[hsl(var(--secondary))] rounded-lg"
            onClick={() => setIsActive(false)}
            onMouseOver={() => setSelectedLink({ isActive: true, index })}
            onMouseLeave={() => setSelectedLink({ isActive: false, index })}
          >
            <motion.p
              className={`text-[32px] pr-[30px] pt-[10px] font-[350] lg:text-[5vw] lg:pr-[2vw] cursor-can-hover ${
                currentHref !== href ? "text-accent/60" : "underline text-primary"
              }`}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
