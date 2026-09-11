import type { Variants } from "framer-motion";

/**
 * Spring configurations for smooth macOS-like physics
 */
export const springTransitions = {
  smooth: {
    type: "spring",
    stiffness: 280,
    damping: 26,
    mass: 0.9,
  },
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 32,
  },
  dockSpring: {
    type: "spring",
    stiffness: 360,
    damping: 28,
  },
  easeOutCubic: [0.16, 1, 0.3, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
};

/**
 * 3D Background Dim Overlay Variants
 * Slightly dims the central 3D canvas when content panel is active
 */
export const dimOverlayVariants: Variants = {
  idle: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    pointerEvents: "none",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  active: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    pointerEvents: "auto",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Split Navigation (Idle State)
 * Left & Right text lists framing the central 3D model
 */
export const splitNavContainerVariants: Variants = {
  idle: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  active: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const splitNavLeftItemVariants: Variants = {
  idle: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  active: {
    opacity: 0,
    x: -50,
    filter: "blur(4px)",
    transition: {
      duration: 0.28,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

export const splitNavRightItemVariants: Variants = {
  idle: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  active: {
    opacity: 0,
    x: 50,
    filter: "blur(4px)",
    transition: {
      duration: 0.28,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

/**
 * Docked Side Icon Rails (Active State)
 * Slide in from far left & far right edges when a tab is selected
 */
export const dockedRailLeftVariants: Variants = {
  hidden: {
    x: -90,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 28,
      delay: 0.1,
      staggerChildren: 0.05,
    },
  },
};

export const dockedRailRightVariants: Variants = {
  hidden: {
    x: 90,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 28,
      delay: 0.1,
      staggerChildren: 0.05,
    },
  },
};

export const dockedIconItemVariants: Variants = {
  hidden: {
    scale: 0.7,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

/**
 * Main Glassmorphism Content Panel (Circular Reveal / Radial Mask Expansion)
 * Expands radially outward from center like a Sci-Fi holographic HUD
 */
export const contentPanelVariants: Variants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: [0.76, 0, 0.24, 1],
      scale: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.4, ease: "easeOut" },
      filter: { duration: 0.45, ease: "easeOut" },
    },
  },
  exit: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    transition: {
      duration: 0.48,
      ease: [0.76, 0, 0.24, 1],
      opacity: { duration: 0.3 },
    },
  },
};

/**
 * Tab Content Radial Expansion (When entering sub-details or switching tabs)
 */
export const tabContentCircularVariants: Variants = {
  enter: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
  },
  center: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1],
      opacity: { duration: 0.28 },
    },
  },
  exit: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
      opacity: { duration: 0.2 },
    },
  },
};

/**
 * Tab Switching Inside Content Panel (Smooth horizontal slide fallback)
 */
export const tabContentSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(6px)",
    transition: {
      duration: 0.22,
      ease: "easeInOut",
    },
  }),
};

/**
 * Mobile Bottom Navigation Bar Variants
 */
export const mobileBottomNavVariants: Variants = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 26,
    },
  },
};
