import { chakra, Text } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const MotionBox = chakra(motion.div);
import "./AnyScreen.css";
import SVG from "./Svg";

export const AnyScreen = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isActive, setIsActive] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
    >
      <MotionBox
        marginTop={{ base: "50px", md: "200px" }}
        display='flex'
        flexDirection='column'
        paddingX={{ base: "10px", md: "92px" }}
        gap='12px'
        height={{ base: "300px", md: "1000px" }}
      >
        <motion.div variants={titleVariants}>
          <Text
            fontSize='clamp(1.25rem, -0.1378rem + 5.0466vw, 5.3125rem)'
            fontWeight='400'
            color='gray2'
            textAlign='center'
          >
            ОДИН ПРОДУКТ. БУДЬ-ЯКИЙ ЕКРАН.
          </Text>
        </motion.div>

        <SVG isActive={isActive} />
      </MotionBox>
    </motion.div>
  );
};
