import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

import StarField from './components/3d/stars/StarField';
import Earth from './components/3d/earth/Earth';
import Mars from './components/3d/mars/Mars';
import CameraScrollAnimation from './components/3d/cameraScrollAnimation';
import FadeInSection from './components/effect/fadeInSection';
import Hero from './pages/hero';
import About from './pages/about';
// import AsteroidBelt from './components/3d/asteroid/AsteroidBelt';

function App() {
  const scrollElRef = useRef<HTMLElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  const snapToPage = useCallback((pageIndex: number) => {
  if (!scrollElRef.current) return;

  const container = scrollElRef.current;
  const maxScrollTop = container.scrollHeight - container.clientHeight;
  const targetScrollTop = maxScrollTop * (pageIndex / (totalPages - 1));

  gsap.to(container, {
    scrollTop: targetScrollTop,
    duration: 4.0,
    ease: 'power4.out',
  });

  setCurrentPage(pageIndex);
}, [totalPages]);


  useEffect(() => {
    let debounce = false;
    const handleWheel = (e: WheelEvent) => {
      if (debounce) return;
      debounce = true;
      setTimeout(() => (debounce = false), 1200);

      if (e.deltaY > 0 && currentPage < totalPages - 1) {
        snapToPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        snapToPage(currentPage - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPage, snapToPage]);

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 0], fov: 25 }} gl={{ antialias: true, alpha: true }}>
        <ScrollControls
          pages={totalPages}
          damping={0.3}
          enabled={true}
        >
          <ScrollContent onScrollReady={(el) => (scrollElRef.current = el)} />
          <CameraScrollAnimation />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function ScrollContent({ onScrollReady }: { onScrollReady: (el: HTMLElement) => void }) {
  const scroll = useScroll();

  useEffect(() => {
    if (scroll.el) onScrollReady(scroll.el);
  }, [onScrollReady, scroll.el]);

  return (
    <>
      <StarField />
      {/* <Scroll>
        <Earth position={[3.5, -1.2, -6]} scale={1.2} />
        <Mars position={[0, -0.5, 60]} scale={0.3} />
        <group position={[0, 0, 80]} name='AsteroidBelt'>
          <AsteroidBelt
            count={50}
            innerRadius={5}
            outerRadius={8}
            baseTextureUrl="./textures/asteroid/4k_asteroid.jpg"
            logoTextureUrls={["./logo/javascript.png"]}
            minDistance={0.5}
            maxDistance={40}
          />
        </group>

      </Scroll> */}

      <Scroll>
        <group>
          <Earth position={[2.3, -1.2, -6]} scale={1.2} />
        </group>

        <group>
          <Mars position={[-1.2, -2.5, 60]} scale={0.3} />
        </group>
      </Scroll>


      <Scroll html>
        <section className="h-screen w-screen flex justify-start items-center px-20">
          <FadeInSection showFrom={0} showTo={0.5}>
            <Hero />
          </FadeInSection>
        </section>
        <section className="h-screen w-screen flex justify-start items-center px-20">
          <FadeInSection showFrom={0.5} showTo={1}>
            <About />
          </FadeInSection>
        </section>
      </Scroll>
    </>
  );
}

export default App;

