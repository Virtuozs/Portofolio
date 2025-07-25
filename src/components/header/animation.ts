import type { Transition } from "framer-motion";

import type { Easing } from "framer-motion";

const bezierEase: Easing = [0.76, 0, 0.24, 1];

const transition: Transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

export const opacity = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    transition: { duration: 0.35 }
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.35 }
  }
};

export const height = {
  initial: {
    height: 0
  },
  enter: {
    height: 'auto',
    transition
  },
  exit: {
    height: 0,
    transition
  }
};

export const background = {
  initial: {
    height: 0
  },
  open: {
    height: '100dvh',
    transition
  },
  closed: {
    height: 0,
    transition
  }
};

export const blur = {
  open: {
    filter: "blur(4px)",
    transition: { duration: 0.3 }
  },
  closed: {
    filter: "blur(0px)",
    transition: { duration: 0.3 }
  }
};

export const translate= {
  initial: {
    y: '100%',
    opacity: 0
  },
  enter: (delays: [number, number]) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: bezierEase,
      delay: delays[0]
    }
  }),
  exit: (delays: [number, number]) => ({
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: bezierEase,
      delay: delays[1]
    }
  })
};