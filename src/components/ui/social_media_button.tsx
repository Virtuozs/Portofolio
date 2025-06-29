import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "../../data/config";
import { Link } from "react-router-dom";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} className="text-[color:var(--color-primary)]" />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <SiLinkedin size={"24"} className="text-[color:var(--color-primary)]"/>,
  },
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10">
      {show &&
        BUTTONS.map((button) => (
          <Link to={button.href} key={button.name} target="_blank">
            <Button variant={"ghost"}>{button.icon}</Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
