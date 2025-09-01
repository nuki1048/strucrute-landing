import { Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import useScroll from "../../hooks/useScroll";
import { ExpandedFormFloating } from "./ExpandedFormFloating";
import { FormButton } from "./FormButton";
import { buttonVariants, containerVariants, textVariants } from "./animations";

export const FormFloating = () => {
  const { isEndOfPage } = useScroll();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      variants={containerVariants(isMobile)}
      initial='hidden'
      animate={isExpanded ? "expanded" : "visible"}
      exit='exit'
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        zIndex: 9,
        width: isMobile ? "305px" : "385px",
        height: "60px",
        padding: "5px",
        backgroundColor: "rgba(31 31 31 0.4)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        alignItems: "center",
        justifyContent: "space-between",
        display: isEndOfPage ? "none" : "flex",
        flexDirection: isExpanded ? "column" : "row",
        overflow: "hidden",
      }}
    >
      {!isExpanded ? (
        <>
          <motion.div variants={textVariants}>
            <Text
              fontSize={{
                base: "14px",
                md: "16px",
              }}
              color='white'
              paddingLeft='20px'
              letterSpacing='0.16px'
            >
              Розкажіть нам про свої потреби
            </Text>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
          >
            <FormButton onClose={handleButtonClick} />
          </motion.div>
        </>
      ) : (
        <ExpandedFormFloating onClose={handleButtonClick} />
      )}
    </motion.div>
  );
};
