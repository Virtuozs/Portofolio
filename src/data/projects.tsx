import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { TypographyH3, TypographyP } from "../components/ui/typography";
import SlideShow from "../components/slide_show";
const BASE_PATH = "/projects_assets";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" to={live}>
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" to={repo}>
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | undefined;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "Project One",
    category: "Placeholder",
    title: "Project One",
    src: "",
    screenshots: ["landing.png"],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.next, PROJECT_SKILLS.chakra, PROJECT_SKILLS.reactQuery, PROJECT_SKILLS.firebase],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.prisma, PROJECT_SKILLS.python, PROJECT_SKILLS.postgres, PROJECT_SKILLS.sockerio],
    },
    live: "",
    github: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">Lorem ipsum dolor sit amet.</TypographyP>
          <TypographyP className="font-mono ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Section One</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <SlideShow images={[`${BASE_PATH}/codingducks/problems.png`]} />
          {/* <TypographyH3 className="my-4 mt-8">Section Two</TypographyH3> */}
          {/* <p className="font-mono mb-2">Lorem ipsum dolor sit amet consectetur.</p> */}
          {/* <SlideShow images={[`${BASE_PATH}/codingducks/ducklets.png`]} /> */}
        </div>
      );
    },
  },
  {
    id: "Project Two",
    category: "Placeholder",
    title: "Project Two",
    src: ``,
    screenshots: ["1.png", "2.png", "3.png"],
    live: "",
    github: "",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.next, PROJECT_SKILLS.chakra, PROJECT_SKILLS.vue],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.prisma, PROJECT_SKILLS.postgres, PROJECT_SKILLS.docker],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">Lorem ipsum dolor sit amet consectetur adipisicing elit.</TypographyP>
          <ProjectsLinks live={this.live} />
          <p className="font-mono mb-2 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <SlideShow images={[`${BASE_PATH}/couponluxury/landing.png`]} />
          <TypographyH3 className="my-4">Lorem Ipsum</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet.</p>
          <SlideShow images={[`${BASE_PATH}/couponluxury/stores.png`]} />
        </div>
      );
    },
  },
  {
    id: "Project Three",
    category: "Placeholder",
    title: "Project Three",
    src: ``,
    screenshots: [""],
    live: "",
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.sanity],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">Lorem ipsum dolor sit amet consectetur adipisicing elit.</TypographyP>
          <ProjectsLinks live={this.live} />
          <p className="font-mono mb-2 mt-8">Lorem ipsum dolor sit amet.</p>
          <SlideShow images={[`${BASE_PATH}/the-booking-desk/landing.png`]} />
          <TypographyH3 className="my-4 mt-8">Lorem Ipsum</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet.</p>
          <SlideShow images={[`${BASE_PATH}/the-booking-desk/blogs.png`]} />
        </div>
      );
    },
  },
  {
    id: "Portfolio",
    category: "Placeholder",
    title: "My Portfolio",
    src: ``,
    screenshots: ["1.png"],
    live: "",
    github: "",
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.next, PROJECT_SKILLS.shadcn, PROJECT_SKILLS.framerMotion, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.spline],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">Lorem ipsum dolor sit amet consectetur.</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Lorem Ipsum</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <SlideShow images={[`${BASE_PATH}/portfolio/landing.png`]} />
        </div>
      );
    },
  },
  {
    id: "Project Five",
    category: "Placeholder",
    title: "Project Five",
    src: ``,
    screenshots: ["1.png", "2.png"],
    live: "",
    github: "",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.next, PROJECT_SKILLS.chakra],
      backend: [PROJECT_SKILLS.supabase],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">Lorem ipsum dolor sit amet consectetur adipisicing elit.</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/ghostchat/1.png`]} />
        </div>
      );
    },
  },
  {
    id: "Project Six",
    category: "Placeholder",
    title: "Project Six",
    src: ``,
    screenshots: ["1.png"],
    live: "",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.vue],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo, PROJECT_SKILLS.express, PROJECT_SKILLS.docker],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/jra/1.png`]} />
          <TypographyH3 className="my-4 mt-8">Lorem Ipsum</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          </ul>
        </div>
      );
    },
  },
];

export default projects;
