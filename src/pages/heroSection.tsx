import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { usePreloader } from "../hooks/usePreloader";
import { mergeClass } from "../libs/utils";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { config } from "../data/config";
import { BlurIn, BoxReveal } from "../components/reveal_animation";
import ScrollDownIcon from "../components/scroll_down_icon";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={mergeClass("relative w-full min-h-screen flex items-center justify-center")}>
      <div className="grid md:grid-cols-2">
        <div
          className={mergeClass(
            "min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] z-[2]",
            "col-span-2 md:col-span-1",
            "flex flex-col justify-start sm:justify-center items-center md:items-start",
            "pt-20 px-6 sm:px-10 md:px-24 lg:px-40 xl:px-48"
          )}
        >
          {!isLoading && (
            <>
              <div className="w-full text-center md:text-left">
                <BlurIn delay={0.7}>
                  <p
                    className={mergeClass(
                      "md:self-start mt-4 font-display text-md text-base ml-3",
                      "cursor-default font-display font-body sm:text-base md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>
                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={mergeClass(
                          "font-thin text-4xl text-transparent ml-1 text-left",
                          "cursor-default text-edge-outline font-extrabold font-heading sm:text-2xl md:text-6xl "
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <br className="md:block hidden" />
                        {config.author.split(" ")[1]}

                      </h1>
                    </TooltipTrigger>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p
                    className={mergeClass(
                      "md:self-start md:mt-4 font-display text-md text-base ml-3",
                      "cursor-default font-display font-body sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                    )}
                  >
                    A Software Engineer
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 md:ml-2 flex flex-col gap-3">
                <Link
                  to={
                    ""
                  }
                  target="_blank"
                  className="flex-1"
                >
                  <BoxReveal delay={2} width="100%" >
                    <Button className="flex items-center bg-primary text-background  gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="md:self-start flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link to={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden text-primary"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>pls 🥹 🙏</p>
                    </TooltipContent>
                  </Tooltip>
                  <Link
                    to={config.social.github}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiGithub size={24} className="text-[color:var(--color-primary)]"/>
                    </Button>
                  </Link>
                  <Link
                    to={config.social.linkedin}
                    target="_blank"
                  >
                    <Button variant={"outline"}>
                      <SiLinkedin size={24} className="text-[color:var(--color-primary)]"/>
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
