export const expandedContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

export const thankYouVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.4,
    },
  },
};

export const containerVariants = (isMobile: boolean) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      x: "-50%",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      x: "-50%",
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
    expanded: {
      opacity: 1,
      y: 0,
      scale: 1,
      x: "-50%",
      width: isMobile ? "90vw" : "600px",
      height: "fit-content",
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      x: "-50%",
      transition: {
        duration: 0.3,
      },
    },
  };
};

export const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
    },
  },
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const buttonVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: 1.0,
    },
  },
  expanded: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

export const formListItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const numberVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

export const checkIconVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: -90,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 90,
    transition: {
      duration: 0.2,
    },
  },
};
