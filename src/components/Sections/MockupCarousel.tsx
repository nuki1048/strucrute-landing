import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import mockup from "../../assets/macbook-mockup.png";

export const MockupCarousel = () => {
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      paddingY='20px'
      w='100%'
      h={{ base: "240px", md: "700px" }}
      gap='20px'
      overflow='hidden'
      paddingLeft='92px'
    >
      <motion.div
        style={{
          display: "flex",
          gap: "20px",
          whiteSpace: "nowrap",
          position: "absolute",
          top: "0",
          left: 0,
          transform: "translateY(-50%)",
          height: "100%",
          alignItems: "center",
        }}
        animate={{
          x: [-1840, 0], // Move from right to left (2 images * 920px width + 20px gap)
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* First set of mockups */}
        <Image
          src={mockup}
          alt='mockup'
          style={{
            width: "920px !important",
            height: "600px !important",
          }}
          borderRadius='35px'
          flexShrink={0}
        />
        <Image
          src={mockup}
          alt='mockup'
          style={{
            width: "920px !important",
            height: "600px !important",
          }}
          borderRadius='35px'
          flexShrink={0}
        />

        {/* Second set for seamless loop */}
        <Image
          src={mockup}
          alt='mockup'
          style={{
            width: "920px !important",
            height: "600px !important",
          }}
          borderRadius='35px'
          flexShrink={0}
        />
        <Image
          src={mockup}
          alt='mockup'
          style={{
            width: "920px !important",
            height: "600px !important",
          }}
          borderRadius='35px'
          flexShrink={0}
        />

        {/* Third set to ensure seamless loop */}
        <Image
          src={mockup}
          alt='mockup'
          style={{
            width: "920px !important",
            height: "600px !important",
          }}
          borderRadius='35px'
          flexShrink={0}
        />
        <Image
          src={mockup}
          alt='mockup'
          style={{
            width: "920px !important",
            height: "600px !important",
          }}
          borderRadius='35px'
          flexShrink={0}
        />
      </motion.div>
    </Box>
  );
};
