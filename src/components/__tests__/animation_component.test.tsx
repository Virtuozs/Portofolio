import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlurIn, BoxReveal } from "../reveal_animation";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    motion: {
    div: ({
        children,
        ...props
    }: { children: React.ReactNode } & React.ComponentProps<"div">) => (
        <div data-testid="motion-div" {...props}>
        {children}
        </div>
    ),
    },
    useAnimation: () => ({ start: vi.fn() }),
    useInView: () => true,
  };
});

describe("BlurIn", () => {
  it("renders children with default animation states", () => {
    render(
      <BlurIn>
        <p>Test BlurIn</p>
      </BlurIn>
    );
    const element = screen.getByText("Test BlurIn");
    expect(element).toBeInTheDocument();
  });
});

describe("BoxReveal", () => {
  it("renders child and slide overlay", () => {
    render(
      <BoxReveal>
        <p>Revealed content</p>
      </BoxReveal>
    );
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
    expect(screen.getAllByTestId("motion-div").length).toBeGreaterThanOrEqual(2);
  });
});
