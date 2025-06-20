import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/theme_context.tsx'
import Preloader from './context/preloader/preloader.tsx'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Preloader>
        <Toaster />
        <App />
      </Preloader>
    </ThemeProvider>
  </StrictMode>,
)
