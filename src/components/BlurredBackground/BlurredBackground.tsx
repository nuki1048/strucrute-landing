import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import image from "../../assets/cloud-image.png";
export const BlurredBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={containerRef}
      position='relative'
      w='100%'
      h='100vh'
      overflow='hidden'
    >
      <Box
        position='absolute'
        top='0'
        left='0'
        w='100%'
        h='100%'
        backgroundImage={`url(${image})`}
        backgroundSize='cover'
        backgroundPosition='center'
        filter='blur(5px)'
        opacity={0.3}
        zIndex={1}
      />

      <Box
        position='absolute'
        top='50%'
        left='0'
        w='100%'
        transform='translateY(-50%)'
        zIndex={2}
      >
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          <Text
            fontSize={{ base: "3xl", md: "6xl", lg: "250px" }}
            fontWeight='300'
            textTransform='uppercase'
            letterSpacing='wider'
            lineHeight={1}
            style={{
              background:
                "linear-gradient(90deg, #D9D9D9 0%, #70CBC3 29%, #C9C9C9 66%, #3741CA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            UI/UX DESIGN + WEB DEVELOPMENT + MOBILE APPS
          </Text>
        </motion.div>
      </Box>
    </Box>
  );
};
