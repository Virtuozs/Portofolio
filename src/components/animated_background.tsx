/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, type SPEObject, type SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { type Skill, SkillNames, SKILLS } from "../data/constants";
import { usePreloader } from "../hooks/usePreloader";
import { useTheme } from "../hooks/useTheme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { sleep } from "../libs/utils";

gsap.registerPlugin(ScrollTrigger);

const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      // position: { x: 500, y: -200, z: 0 },
      position: { x: -10, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: -900, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: -250, y: -20, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 3,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: -900, y: -100, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 3,
        z: 0,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: -400, y: -100, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: -900, y: -100, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
};

type Section = "hero" | "skills" | "projects";

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 764px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [keycapAnimtations, setKeycapAnimtations] = useState<{
    start: () => void;
    stop: () => void;
  }>();

  const keyboardStates = (section: Section) => {
    return STATES[section][isMobile ? "mobile" : "desktop"];
  };

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkill?.name === e.target.name) return;

    const skillsEl = document.getElementById("skills");
    if (!skillsEl) return;

    const rect = skillsEl.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight &&
      rect.bottom > 0;

    if (!inView) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    } else {
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill && (!selectedSkill || selectedSkill.name !== skill.name)) {
        setSelectedSkill(skill);
      }
    }
  };

  // handle keyboard press interaction
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  // handle keyboard heading and desc visibility
  useEffect(() => {

    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    )return;
    
    if (activeSection !== "skills") {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
      return;
    }
    if (theme === "dark" && !isMobile) {
      textDesktopDark.visible = false;
      textDesktopLight.visible = true;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    } else if (theme === "dark" && isMobile) {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = true;
    } else if (theme === "light" && !isMobile) {
      textDesktopDark.visible = true;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    } else {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = true;
      textMobileLight.visible = false;
    }
  }, [theme, splineApp, isMobile, activeSection]);

  // initialize gsap animations
  useEffect(() => {
    handleSplineInteractions();
    handleGsapAnimations();
    setKeycapAnimtations(getKeycapsAnimation());
  }, [splineApp]);

  useEffect(() => {
    let rotateKeyboard: gsap.core.Tween;
    let teardownKeyboard: gsap.core.Tween;
    (async () => {
      if (!splineApp) return;
      const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");

      if (!kbd) return;
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
      });
      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        {
          y: 0,
          // x: -Math.PI,
          x: -Math.PI,
          z: 0,
        },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          // ease: "none",
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
      if (activeSection === "hero") {
        await sleep(100);
        rotateKeyboard.restart();
        teardownKeyboard.pause();
      }
      if (activeSection === "skills") {
        rotateKeyboard.pause();
        await sleep(100);
      } else {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
      if (activeSection === "projects") {
        await sleep(300);
        keycapAnimtations?.start();
        rotateKeyboard.pause();
      } else {
        keycapAnimtations?.stop();
      }
    })();
    return () => {
      if (rotateKeyboard) rotateKeyboard.kill();
      if (teardownKeyboard) teardownKeyboard.kill();
    };
  }, [activeSection, splineApp]);

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);

  //reveal keycaps
  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    window.history.pushState(null, "", "/" + hash);
    if (!splineApp || isLoading || keyboardRevealed) return;
    revealKeyCaps();
  }, [splineApp, isLoading, activeSection, keyboardRevealed]);

  const revealKeyCaps = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);
    
    gsap.fromTo(
      kbd?.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        x: keyboardStates(activeSection).scale.x,
        y: keyboardStates(activeSection).scale.y,
        z: keyboardStates(activeSection).scale.z,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    await sleep(900);
    if (isMobile) {
      const mobileKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-mobile"
      );
      mobileKeyCaps.forEach((keycap) => {
        keycap.visible = true;
      });
    } else {
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop"
      );
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }
    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;
    splineApp.addEventListener("keyUp", () => {
      if (!splineApp) return;
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp) return;
      const skill = SKILLS[e.target.name as SkillNames];

      if (skill) setSelectedSkill(skill);
      splineApp.setVariable("heading", skill.label);
      splineApp.setVariable("desc", skill.shortDescription);
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  const handleGsapAnimations = () => {
    if (!splineApp) return;
    const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return;
    gsap.set(kbd.scale, {
      ...keyboardStates("hero").scale,
    });
    gsap.set(kbd.position, {
      ...keyboardStates("hero").position,
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, {
            ...keyboardStates("skills").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("skills").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("skills").rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("hero");
          gsap.to(kbd.scale, { ...keyboardStates("hero").scale, duration: 1 });
          gsap.to(kbd.position, {
            ...keyboardStates("hero").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("hero").rotation,
            duration: 1,
          });
        },
      },
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("projects");
          gsap.to(kbd.scale, {
            ...keyboardStates("projects").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("projects").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("projects").rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, {
            ...keyboardStates("skills").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("skills").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("skills").rotation,
            duration: 1,
          });
        },
      },
    });
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    const tweens: gsap.core.Tween[] = [];
    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap?.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };
    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap?.position, {
          y: 0,
          duration: 3,
          repeat: 1,
          ease: "elastic.out(1,0.8)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };
    const removePrevTweens = () => {
      tweens.forEach((t) => t.kill());
    };
    return { start, stop };
  };

  return (
        <>
      {isLoading ? (
        <></>
      ) : (
        <Suspense fallback={<></>}>
          <Spline
            ref={splineContainer}
            scene="/keyboard_final.splinecode"
            onLoad={(app: Application) => {
              setSplineApp(app);
              setTimeout(() => bypassLoading(), 300);
              
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default AnimatedBackground;
