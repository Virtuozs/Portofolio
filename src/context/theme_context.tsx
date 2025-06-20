// import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { createContext, useEffect, useState, type ReactNode } from "react";

// interface ThemeContextType {
//     theme: string;
//     toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps{
//     children: ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
//     const [theme, setTheme] = useState<string>(() => {
//         if (typeof window !== "undefined") {
//             return localStorage.getItem("theme") || "dark";
//         }
//         return "dark";
//     });

//     useEffect(() => {
//         const root = window.document.documentElement;
//         if(theme == "dark"){
//             root.classList.add("dark");
//         } else {
//             root.classList.remove("dark");
//         }

//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const toggleTheme = () => setTheme((prev : string) => (prev === "light" ? "dark" : "light"));

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = (): ThemeContextType => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };

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