// components/pages/FadeInSection.tsx
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  showFrom: number; // scroll offset start (e.g. 0.34)
  showTo: number;   // scroll offset end   (e.g. 0.66)
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  showFrom,
  showTo,
}) => {
  const scroll = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useFrame(() => {
    const offset = scroll.offset;
    const inRange = offset >= showFrom && offset <= showTo;
    if (inRange && !visible) setVisible(true);
    if (!inRange && visible) setVisible(false);
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
