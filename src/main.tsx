import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme_context.tsx";
import Preloader from "./context/preloader/preloader.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import ElasticCursor from "./components/ui/elastic_cursor.tsx";
import { SmoothScroll } from "./components/smooth_scrolling.tsx";
import Header from "./components/header/header.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <ThemeProvider>
        <Preloader>
          <ElasticCursor />
          <SmoothScroll>
            <TooltipProvider>
              <Header/>
              <App />
            </TooltipProvider>
          </SmoothScroll>
        </Preloader>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
