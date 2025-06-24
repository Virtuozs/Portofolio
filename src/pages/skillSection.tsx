import { Link } from "react-router-dom";
import { BoxReveal } from "../components/reveal_animation";
import { mergeClass } from "../libs/utils";

const SkillsSection = () => {
  return (
    <section id="skills" className="w-full h-screen md:h-[150dvh]">
      <div className="top-[70px] sticky mb-96">
        <Link to={"#skills"}>
          <BoxReveal width="100%">
            <h2
              className={mergeClass(
                "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                "bg-gradient-to-b from-black/80 to-black/50",
                "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 "
              )}
            >
              SKILLS
            </h2>
          </BoxReveal>
        </Link>
        <p className="mx-auto mt-4 line-clamp-4 max-w-3xl font-normal text-base text-center text-neutral-300">
          (hint: press a key)
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
