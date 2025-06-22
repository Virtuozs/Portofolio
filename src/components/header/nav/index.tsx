import { useState } from "react";
import { motion } from "framer-motion";
import { links } from "../config";
import { height } from "../animation";
import Body from "./body/body";
// import Image from "./image/image";

interface NavProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Nav: React.FC<NavProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden"
    >
      <div className="relative flex flex-col sm:flex-row gap-[50px] sm:justify-between mb-3 sm:mb-0">
        <div className="flex flex-col justify-between">
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
          {/* <Footer /> */}
        </div>
        {/* <Image
          src={links[selectedLink.index].thumbnail}
          isActive={selectedLink.isActive}
        /> */}
      </div>
    </motion.div>
  );
};

export default Nav;
