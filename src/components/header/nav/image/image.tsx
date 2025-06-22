import React from "react";
import { motion } from "framer-motion";
import { opacity } from "../../animation";

interface ImageProps {
  src: string;
  isActive: boolean;
}

const Image: React.FC<ImageProps> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className="hidden lg:block lg:w-[500px] lg:h-[450px] relative"
    >
      <img
        src={src}
        width={400}
        height={400}
        className="my-32 w-full h-auto object-cover rounded-[--radius]"
        alt="Image"
      />
    </motion.div>
  );
};

export default Image;
