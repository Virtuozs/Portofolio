import AnimatedBackground from "./components/animated_background"
import { mergeClass } from "./libs/utils"
import HeroSection from "./pages/heroSection"

function App() {

  return (
    <main className={mergeClass("bg-slate-100 dark:bg-transparent")}>
      <div className="top-0 z-0 fixed w-full h-screen">
        <AnimatedBackground />
      </div>
      <HeroSection />
    </main>
  )
}

export default App
