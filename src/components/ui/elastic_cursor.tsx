import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { mergeClass } from "../../libs/utils";
import { useMouse } from "../../hooks/useMouse";
import { usePreloader } from "../../hooks/usePreloader";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function useTicker(callback: () => void, paused: boolean) {
  useEffect(() => {
    if (!paused) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

function useInstance<T extends object>(value: T | (() => T)): T {
  const EMPTY = {} as T;
  const ref = useRef<T>(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? (value as () => T)() : value;
  }
  return ref.current;
}

// Helpers
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getRekt(el: HTMLElement): DOMRect | null {
  let current: HTMLElement | null = el;
  for (let i = 0; i < 3 && current; i++) {
    if (current.classList.contains("cursor-can-hover")) {
      return current.getBoundingClientRect();
    }
    current = current.parentElement;
  }
  return null;
}

// Constants
const CURSOR_DIAMETER = 60;

const ElasticCursor = () => {
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { x, y } = useMouse();
  const jellyRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [cursorMoved, setCursorMoved] = useState(false);

  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));

  type Setter = (value: number) => void;

  const set = useInstance<{
    x?: Setter;
    y?: Setter;
    r?: Setter;
    sx?: Setter;
    sy?: Setter;
    width?: Setter;
  }>({});

  useLayoutEffect(() => {
    if (!jellyRef.current) return;
    set.x = gsap.quickSetter(jellyRef.current, "x", "px") as Setter;
    set.y = gsap.quickSetter(jellyRef.current, "y", "px") as Setter;
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg") as Setter;
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX") as Setter;
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY") as Setter;
    set.width = gsap.quickSetter(jellyRef.current, "width", "px") as Setter;
  }, [set]);

  const loop = useCallback(() => {
    if (!set.x || !set.y || !set.r || !set.sx || !set.sy || !set.width) return;

    const rotation = getAngle(vel.x || 0, vel.y || 0);
    const scale = getScale(vel.x || 0, vel.y || 0);

    if (!isHovering && !isLoading) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(CURSOR_DIAMETER + scale * 200);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    } else {
      set.r(0);
    }
  }, [isHovering, isLoading, pos.x, pos.y, set, vel.x, vel.y]);

  useLayoutEffect(() => {
    if (isMobile) return;

    const setFromEvent = (e: MouseEvent) => {
      if (!jellyRef.current) return;

      if (!cursorMoved) setCursorMoved(true);

      const el = e.target as HTMLElement;
      const hoverElemRect = getRekt(el);

      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);

        gsap.to(jellyRef.current, {
          rotate: 0,
          duration: 0,
        });

        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 20,
          height: el.offsetHeight + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          // x: Math.min(rect.right, Math.max(rect.left, e.clientX)),
          // y: Math.min(rect.bottom, Math.max(rect.top, e.clientY)),
          borderRadius: 10,
          duration: 1.0,
          ease: "elastic.out(1, 0.5)",
        });
      } else {
        gsap.to(jellyRef.current, {
          borderRadius: 10,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          duration: 0.5,
          ease: "power2.out"
        });
        setIsHovering(false);
      }

      const x = e.clientX;
      const y = e.clientY;

      gsap.to(pos, {
        x,
        y,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          vel.x = (x - pos.x) * 1.0;
          vel.y = (y - pos.y) * 1.0;
        },
      });

      loop();
    };

    if (!isLoading) {
      window.addEventListener("mousemove", setFromEvent);
    }

    return () => {
      if (!isLoading) {
        window.removeEventListener("mousemove", setFromEvent);
      }
    };
  }, [isLoading, cursorMoved, isMobile, pos, loop, vel]);

  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);

  useTicker(loop, isLoading || isMobile);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className={mergeClass(
          "fixed left-0 top-0 z-[999] pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2 border-2 border-black dark:border-white rounded-lg"
        )}
        style={{
        width: `${CURSOR_DIAMETER}px`,
        height: `${CURSOR_DIAMETER}px`,
        backdropFilter: "invert(100%)",
        }}
      ></div>
      <div
        className="w-5 h-5 rounded-full fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-none duration-300"
        style={{
          top: y,
          left: x,
          backdropFilter: "invert(100%)",
        }}
      ></div>
    </>
  );
};

export default ElasticCursor;