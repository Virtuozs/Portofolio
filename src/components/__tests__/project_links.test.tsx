import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProjectsLinks from "../ui/project_link";

describe("ProjectsLinks", () => {
  it("renders no links when all props are missing", () => {
    render(
      <MemoryRouter>
        <ProjectsLinks />
      </MemoryRouter>
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders only live link when provided", () => {
    render(
      <MemoryRouter>
        <ProjectsLinks live="/live-site" />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /visit website/i });
    expect(link).toHaveAttribute("href", "/live-site");
  });

  it("renders only repo link when provided", () => {
    render(
      <MemoryRouter>
        <ProjectsLinks repo="/github" />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", "/github");
  });

  it("renders only colab link when provided", () => {
    render(
      <MemoryRouter>
        <ProjectsLinks colab="/colab-link" />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /colab/i });
    expect(link).toHaveAttribute("href", "/colab-link");
  });

  it("renders all links when all props are provided", () => {
    render(
      <MemoryRouter>
        <ProjectsLinks
          live="/live"
          repo="/repo"
          colab="/colab"
        />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /visit website/i })).toHaveAttribute("href", "/live");
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "/repo");
    expect(screen.getByRole("link", { name: /colab/i })).toHaveAttribute("href", "/colab");
  });
});
