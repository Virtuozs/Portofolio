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
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiCplusplus,
  SiCmake,
  SiTensorflow,
  SiKeras,
  SiPandas,
  SiOpencv,
  SiNumpy,
  SiPytorch,
  SiGo,
  SiRedis,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { TypographyP } from "../components/ui/typography";
import ProjectsLinks from "../components/ui/project_link";

export type Skill = {
  title: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    icon: <RiNextjsFill/>,
  },
  pytorch: {
    title: "Pytorch",
    icon: <SiPytorch/>
  },
  go: {
    title: "Go",
    icon: <SiGo/>
  },
  redis: {
    title: "Redis",
    icon: <SiRedis/>
  },
  tensorflow: {
    title: "Tensorflow",
    icon: <SiTensorflow/>
  },
  numpy: {
    title: "Numpy",
    icon: <SiNumpy/>
  },
  keras: {
    title: "Keras",
    icon: <SiKeras/>
  },
  pandas: {
    title: "Pandas",
    icon: <SiPandas/>
  },
  opencv: {
    title: "Open CV",
    icon: <SiOpencv/>
  },
  cpp: {
    title: "C++",
    icon: <SiCplusplus/>
  },
  cmake: {
    title: "CMake",
    icon: <SiCmake/>
  },
  vite: {
    title: "Vite",
    icon: <SiVite/>
  },
  chakra: {
    title: "Chakra UI",
    icon: <SiChakraui/>,
  },
  node: {
    title: "Node.js",
    icon: <RiNodejsFill/>,
  },
  python: {
    title: "Python",
    icon: <SiPython/>,
  },
  prisma: {
    title: "prisma",
    icon: <SiPrisma/>,
  },
  postgres: {
    title: "PostgreSQL",
    icon: <SiPostgresql/>,
  },
  mongo: {
    title: "MongoDB",
    icon: <SiMongodb/>,
  },
  express: {
    title: "Express",
    icon: <SiExpress/>,
  },
  reactQuery: {
    title: "React Query",
    icon: <SiReactquery/>,
  },
  shadcn: {
    title: "ShanCN UI",
    icon: <SiShadcnui/>,
  },
  tailwind: {
    title: "Tailwind",
    icon: <SiTailwindcss/>,
  },
  docker: {
    title: "Docker",
    icon: <SiDocker/>,
  },
  firebase: {
    title: "Firebase",
    icon: <SiFirebase/>,
  },
  sockerio: {
    title: "Socket.io",
    icon: <SiSocketdotio/>,
  },
  js: {
    title: "JavaScript",
    icon: <SiJavascript/>,
  },
  ts: {
    title: "TypeScript",
    icon: <SiTypescript/>,
  },
  vue: {
    title: "Vue.js",
    icon: <SiVuedotjs/>,
  },
  react: {
    title: "React.js",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    icon: <TbBrandFramerMotion/>,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: Skill[];
  content: React.ReactNode | undefined;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "Portofolio",
    category: "Web Development",
    title: "Portofolio",
    src: "/project_assets/Portofolio.png",
    screenshots: ["/project_assets/Portofolio.png"],
    skills: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.spline, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.framerMotion, PROJECT_SKILLS.vite],
    live: "https://virtuozs.com/#",
    github: "https://github.com/Virtuozs/Portofolio",
    get content() {
      return (
        <div>
          <TypographyP className="font-heading text-2xl text-center">Portofolio</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyP className="font-body ">A modern, responsive portfolio built from scratch to showcase my skills, projects, and professional journey. Designed with a clean UI and smooth animations, it serves as my digital business card for recruiters, clients, and collaborators.</TypographyP>
          {/* <TypographyH3 className="my-4 mt-8">Section One</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <SlideShow images={[`${BASE_PATH}/codingducks/problems.png`]} /> */}
          {/* <TypographyH3 className="my-4 mt-8">Section Two</TypographyH3> */}
          {/* <p className="font-mono mb-2">Lorem ipsum dolor sit amet consectetur.</p> */}
          {/* <SlideShow images={[`${BASE_PATH}/codingducks/ducklets.png`]} /> */}
        </div>
      );
    },
  },
  {
    id: "Pokedex",
    category: "Web Development",
    title: "Pokedex",
    src: "/project_assets/Pokedex.png",
    screenshots: [""],
    live: "https://pokedex-clone-puce.vercel.app/",
    github: "https://github.com/Virtuozs/WCD03-Assignment-5",
    skills: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.vite],
    get content() {
      return (
        <div>
          <TypographyP className="font-heading text-2xl text-center">Pokedex</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github}/>
          <TypographyP className="font-body ">A Pokémon encyclopedia web app built with <span className="font-bold">React</span> as my first dive into modern frontend frameworks. Fetches data from the <span className="font-bold">PokéAPI</span> to display Pokémon stats, types, and sprites in an interactive interface.</TypographyP>
          {/* <p className="font-mono mb-2 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
          {/* <SlideShow images={[`${BASE_PATH}/couponluxury/landing.png`]} />
          <TypographyH3 className="my-4">Lorem Ipsum</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet.</p>
          <SlideShow images={[`${BASE_PATH}/couponluxury/stores.png`]} /> */}
        </div>
      );
    },
  },
  {
    id: "Book Chain",
    category: "CLI App",
    title: "Book Chain",
    src: "/project_assets/BookChain.png",
    screenshots: [""],
    live: "",
    github: "",
    skills: [PROJECT_SKILLS.cpp, PROJECT_SKILLS.cmake],
    get content() {
      return (
        <div>
          <TypographyP className="font-heading text-2xl text-center">Book Chain</TypographyP>
          <ProjectsLinks repo={this.github} />
          <TypographyP className="font-body ">A C++ terminal-based book management application that allows users to manage books efficiently using custom data structures including a <span className="font-bold">hash table</span>, <span className="font-bold">graph-based recommendation</span>, and <span className="font-bold">insertion sort.</span></TypographyP>
        </div>
      );
    },
  },
  {
    id: "AmAIGAN",
    category: "Deep Learning",
    title: "amAI GAN",
    src: "/project_assets/amAI GAN.png",
    screenshots: [""],
    live: "",
    github: "https://colab.research.google.com/drive/1y8LJVqK7GBvEi7wu5XaeDyCu9wqLV7OP?usp=sharing",
    skills: [PROJECT_SKILLS.python, PROJECT_SKILLS.opencv, PROJECT_SKILLS.pandas, PROJECT_SKILLS.tensorflow, PROJECT_SKILLS.numpy],
    get content() {
      return (
        <div>
          <TypographyP className="font-heading text-2xl text-center">amAI GAN</TypographyP>
          <ProjectsLinks live={this.live} colab={this.github}/>
          <TypographyP className="font-body">A generative deep learning model that automatically colors black-and-white anime sketches using a modified <span className="font-bold">U-NET architecture</span> with <span className="font-bold">Swish-Gated Attention</span> for enhanced detail preservation.</TypographyP>
          {/* <TypographyH3 className="my-4 mt-8">Lorem Ipsum</TypographyH3>
          <p className="font-mono mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <SlideShow images={[`${BASE_PATH}/portfolio/landing.png`]} /> */}
        </div>
      );
    },
  },
  {
    id: "IndoAPAgility",
    category: "Intelegent Document Automation",
    title: "IndoAPAgility",
    src: "project_assets/IndoAPAgility.jpg",
    screenshots: [],
    live: "",
    github: "",
    skills: [PROJECT_SKILLS.python, PROJECT_SKILLS.opencv, PROJECT_SKILLS.go, PROJECT_SKILLS.docker, PROJECT_SKILLS.pytorch, PROJECT_SKILLS.redis,  PROJECT_SKILLS.numpy, PROJECT_SKILLS.postgres],
    get content() {
      return (
        <div>
          <TypographyP className="font-heading text-2xl text-center">IndoAPAgility</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyP className="font-body">A scalable Document Automation SaaS that extracts structured data from unstructured documents (invoices, contracts, forms) using <span className="font-bold">computer vision, NLP, and rule-based pipelines, then delivers results via a REST API.</span></TypographyP>
        </div>
      );
    },
  },
  {
    id: "Music-Player",
    category: "CLI App",
    title: "Music-Player",
    src: "/project_assets/MusicPlayer.png",
    screenshots: [""],
    live: "",
    github: "https://github.com/Virtuozs/Music-Player",
    skills: [],
    get content() {
      return (
        <div>
          <TypographyP className="font-heading text-2xl text-center">Music Player</TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyP className="font-body">A TUI (Text User Interface) music player built in <span className="font-bold">C++</span> using <span className="font-bold">ncurses</span> for interface rendering and low-level audio libraries for playback. Designed for Linux/macOS systems where users want a minimalist, resource-efficient music player controllable entirely via keyboard.</TypographyP>
        </div>
      );
    },
  },
];

export default projects;
