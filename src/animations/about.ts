import { easeOut } from "framer-motion";

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const textVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0, // Disable stagger - let individual items control their timing
      delayChildren: 0.4, // Keep this for desktop
      width: "100%",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      staggerDirection: -1,
      delay: 0.4,
    },
  },
};
