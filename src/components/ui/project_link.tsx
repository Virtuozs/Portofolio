import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";

const ProjectsLinks = ({ live, repo, colab }: { live?: string; repo?: string, colab?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
      <Link className="font-body underline flex gap-2" rel="noopener" target="_new" to={live}>
        <Button variant={"outline"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      )}
      {repo && (
        <Link className="font-body underline flex gap-2" rel="noopener" target="_new" to={repo}>
          <Button variant={"outline"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {colab && (
        <Link className="font-body underline flex gap-2" rel="noopener" target="_new" to={colab}>
          <Button variant={"outline"} size={"sm"}>
            Colab
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProjectsLinks;
