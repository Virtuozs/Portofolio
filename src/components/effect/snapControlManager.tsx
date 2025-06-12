import { useScroll } from '@react-three/drei';
import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';

interface SnapScrollManagerProps {
  totalPages: number;
}

const SnapScrollManager = ({ totalPages }: SnapScrollManagerProps) => {
  const scroll = useScroll();
  const [currentPage, setCurrentPage] = useState(0);

  const snapToPage = useCallback((pageIndex: number) => {
    const targetOffset = pageIndex / (totalPages - 1);
    gsap.to(scroll, {
      offset: targetOffset,
      duration: 1,
      ease: 'power2.inOut',
    });
    setCurrentPage(pageIndex);
  }, [scroll, totalPages]);

  useEffect(() => {
    let locked = false;

    const handleWheel = (e: WheelEvent) => {
      if (locked) return;
      locked = true;
      setTimeout(() => (locked = false), 1200);

      if (e.deltaY > 0 && currentPage < totalPages - 1) {
        snapToPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        snapToPage(currentPage - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPage, snapToPage, totalPages]);

  return null;
};

export default SnapScrollManager;
