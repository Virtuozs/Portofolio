import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { themeDisclaimers } from "../../data/constants";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme({ className }: {className?: string}) {
    const [theme, setTheme] = useTheme();
    const [counter, setCounter] = useState({ dark: 0, light: 0});
    const [toast] = useToast();


    const goLight = () => {
        setCounter((prev) => ({ ...prev, light: prev.light + 1}));
        setTheme("light");
    };

    const goDark = () => {
        const description = 
            themeDisclaimers.dark[counter.dark % themeDisclaimers.dark.length];

        setCounter((prev) => ({ ...prev, dark: prev.dark + 1}));

        toast({
            description,
            className:
                "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
        });

        setTheme("dark");
    };

      return (
    <>
    </>
  );
}