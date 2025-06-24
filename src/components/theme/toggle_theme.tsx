import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { themeDisclaimers } from "../../data/constants";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { mergeClass } from "../../libs/utils";
import Popover from "../ui/popover";

export default function ToggleTheme({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [counter, setCounter] = useState({ dark: 0, light: 0 });
  const { toast } = useToast();

  const goLight = () => {
    setCounter((prev) => ({ ...prev, light: prev.light + 1 }));
    console.log("light");
    setTheme("light");
  };

  const goDark = () => {
    const description =
      themeDisclaimers.dark[counter.dark % themeDisclaimers.dark.length];

    setCounter((prev) => ({ ...prev, dark: prev.dark + 1 }));

    toast({
      description,
      className:
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
    });
    console.log("dark");
    setTheme("dark");
  };

  const trigger = (
    <Button
      variant="outline"
      size="icon"
      className={mergeClass("border bg-transparent", className)}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 pointer-events-none" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 pointer-events-none" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return theme === "light" ? (
    <Button
      variant="outline"
      size="icon"
      className={mergeClass("border bg-transparent", className)}
      onClick={goDark}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 pointer-events-none" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 pointer-events-none" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : (
    <Popover trigger={trigger}>
      <p className="text-sm text-center mb-5 text-popover-foreground">
        {themeDisclaimers.light[counter.light % themeDisclaimers.light.length] ||
          "Are you sure you want to switch to light mode?"}
      </p>
      <div className="flex justify-center">
        <Button variant="outline" size="sm" onClick={goLight}>
          Go Light
        </Button>
      </div>
    </Popover>
  );
}
