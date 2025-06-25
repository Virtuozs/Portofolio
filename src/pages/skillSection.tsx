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
                "bg-clip-text text-transparent text-4xl text-center md:text-7xl",
                "bg-gradient-to-b",
                "from-text-base to-background",
              )}
            >
              SKILLS
            </h2>
          </BoxReveal>
        </Link>
        <p className="mx-auto mt-4 line-clamp-4 max-w-3xl font-normal text-base text-center text-text-base">
          (hint: press a key)
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
