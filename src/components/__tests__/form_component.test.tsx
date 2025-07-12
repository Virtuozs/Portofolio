import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

describe("Form Components: Input, Label, Textarea", () => {
  it("renders Input with placeholder", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("calls onChange for Input", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards ref to Input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("Input supports className override", () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
  });

  it("renders Textarea with placeholder", () => {
    render(<Textarea placeholder="Your message" />);
    expect(screen.getByPlaceholderText("Your message")).toBeInTheDocument();
  });

  it("calls onChange for Textarea", () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} placeholder="Your message" />);
    fireEvent.change(screen.getByPlaceholderText("Your message"), {
      target: { value: "test message" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards ref to Textarea element", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current?.tagName).toBe("TEXTAREA");
  });

  it("renders Label and links to Input with htmlFor", () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </>
    );
    const label = screen.getByText("Name");
    const input = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", "name");
    expect(input).toHaveAttribute("id", "name");
  });

  it("Label supports custom className", () => {
    render(<Label className="custom-label">LabelText</Label>);
    expect(screen.getByText("LabelText")).toHaveClass("custom-label");
  });

  it("forwards ref to Label", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref Label</Label>);
    expect(ref.current?.tagName).toBe("LABEL");
  });
});
