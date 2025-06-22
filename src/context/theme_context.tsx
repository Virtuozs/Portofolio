import { createContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        if(typeof window !== "undefined"){
            return (localStorage.getItem("theme") as Theme) || "dark";
        }
        return "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export {ThemeContext};