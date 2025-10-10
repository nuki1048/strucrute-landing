import { Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import useScroll from "../../hooks/useScroll";
import { ExpandedFormFloating } from "./ExpandedFormFloating";
import { FormButton } from "./FormButton";
import { buttonVariants, containerVariants, textVariants } from "./animations";
import { useTranslation } from "react-i18next";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import { track } from "@vercel/analytics";

export const FormFloating = () => {
  const { t } = useTranslation();
  const { isEndOfPage } = useScroll();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const commonProps = useCommonDeviceProps();
  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
    track("form_floating_button_click", { ...commonProps });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <motion.div
      ref={formRef}
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
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        alignItems: "center",
        justifyContent: "space-between",
        display: isEndOfPage ? "none" : "flex",
        flexDirection: isExpanded ? "column" : "row",
        overflow: "hidden",
        background: "rgba(0,0,0,0.3)",
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
              {t("form-floating.description")}
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
