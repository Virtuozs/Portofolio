
import projects, { type Project } from "../data/projects";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "../components/ui/animated_modal";
import { SmoothScroll } from "../components/smooth_scrolling";
import { mergeClass } from "../libs/utils";
// import { FloatingDock } from "../components/ui/floating_dock";

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto md:h-[130vh]">
      <Link to={"#projects"}>
        <h2
          className={mergeClass(
            "bg-clip-text text-transparent text-4xl text-center md:text-7xl",
            "bg-gradient-to-b",
            "from-text-base to-background",
          )}
        >
          Projects
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.map((project) => (
          <Modall key={project.src} project={project} />
        ))}
      </div>
    </section>
  );
};

const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn">
          <div
            className="relative w-[400px] h-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "3/2" }}
          >
            <img
              className="absolute w-full h-full top-0 left-0 hover:scale-[1.05] transition-all text-background"
              src={project.src}
              alt={project.title}
              width={300}
              height={300}
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-primary via-primary/80 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-4">
                <div className="text-lg text-left font-heading text-white">{project.title}</div>
                <div className="text-xs rounded-lg font-body bg-secondary w-fit p-1.5 text-white">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto" thumbnailUrl={project.src} Skills={project.skills}>
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

export const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-background font-bold text-center">
        {project.title}
      </h4>
      {project.content}
    </>
  );
};
