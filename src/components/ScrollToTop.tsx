import { Button, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ArrowUpIcon from "../assets/arrow-back.svg?react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: isMobile ? "80px" : "30px",
        right: isMobile ? "20px" : "30px",
        zIndex: 1000,
        display: isVisible ? "block" : "none",
      }}
    >
      <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
        <Button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label='Scroll to top'
          width={"40px"}
          height={"40px"}
          borderRadius='50%'
          backgroundColor='transparent'
          border='1px solid'
          borderColor='gray1'
          color='gray1'
          _hover={{
            backgroundColor: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 15px rgba(72, 67, 174, 0.3)",
          }}
          _active={{
            backgroundColor: "gray1",
            transform: "translateY(0px)",
          }}
          boxShadow='0 4px 15px rgba(72, 67, 174, 0.2)'
          transition='all 0.3s ease'
        >
          <ArrowUpIcon
            style={{
              transform: "rotate(90deg)",
              width: 20,
              height: 20,
            }}
            fill={isHovered ? "#000000" : "white"}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};
