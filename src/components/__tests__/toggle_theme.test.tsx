import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, type MockInstance } from "vitest";
import { act } from "react";
import { useTheme } from "../../hooks/useTheme";
import ToggleTheme from "../theme/toggle_theme";

vi.mock("../../hooks/useTheme", () => ({
  useTheme: vi.fn(),
}));

vi.mock("../../hooks/useToast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe("ToggleTheme", () => {
  it("renders and toggles theme", async () => {
    const mockSetTheme = vi.fn();

    (useTheme as unknown as MockInstance<
      () => { theme: string; setTheme: (v: string) => void }
    >).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ToggleTheme />);

    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });

    await act(async () => {
      toggleButton.click();
    });

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
