import AnimatedBackground from "./components/animated_background"
import { mergeClass } from "./libs/utils"
import HeroSection from "./pages/heroSection"
import ProjectsSection from "./pages/projectSection"
import SkillsSection from "./pages/skillSection"

function App() {

  return (
    <main className={mergeClass("bg-slate-100 dark:bg-transparent")}>
      <div className="top-0 z-0 fixed w-full h-screen">
        <AnimatedBackground />
      </div>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  )
}

export default App
