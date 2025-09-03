import { Box, Container, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { ListItem } from "../ListItem";
import { motion, easeOut } from "framer-motion";

const listItems = [
  "UI/UX-дизайн та розробку",
  "Вебзастосунки",
  "Мобільні застосунки",
  "Безпеку та надійність",
  "Інтерактивні рішення",
  "Постійну підтримку й розвиток",
];

const keywords = [
  "Mobile Development",
  "UX Design",
  "UI Design",
  "Interactive",
  "Prototyping",
  "Visual",
  "Visual Front-end Development",
  "Back-end Development",
  "Support",
];

// Animation variants
const containerVariants = {
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

const textVariants = {
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

const gridVariants = {
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
    },
  },
};

// Custom item variants for line-by-line animation
const createItemVariants = (index: number, isMobile: boolean) => {
  if (isMobile) {
    // Mobile: simple sequential animation (01, 02, 03, 04, 05, 06)
    return {
      hidden: {
        opacity: 0,
        x: -20,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: easeOut,
          delay: 0.4 + index * 0.1, // Base delay + sequential delay
        },
      },
    };
  } else {
    // Desktop: line-by-line animation (01&04, 02&05, 03&06)
    // Items 0,3 are line 0; items 1,4 are line 1; items 2,5 are line 2
    const lineIndex = index < 3 ? index : index - 3;
    return {
      hidden: {
        opacity: 0,
        x: -20,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: easeOut,
          delay: lineIndex * 0.2, // Delay based on line, not individual item
        },
      },
    };
  }
};

const keywordsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8,
    },
  },
};

export const About = () => {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      exit='exit'
      viewport={{ amount: 0.3 }}
      variants={containerVariants}
    >
      <Box
        position='relative'
        display='flex'
        flexDirection='column'
        alignItems='center'
        paddingY='20px'
        w='100%'
        h={{ base: "100%", md: "630px" }}
        marginTop='150px'
        overflow='hidden'
        paddingX={{ base: "60px", md: "100px" }}
      >
        <Container
          position='relative'
          w='100%'
          h='100%'
          maxW={{
            base: "100%",
            md: "100%",
            lg: "100%",
            xl: "9xl",
          }}
          p='0'
          marginX='0'
          zIndex={2}
          display='flex'
          flexDirection='column'
          alignItems='flex-end'
        >
          <motion.div variants={textVariants} style={{ width: "100%" }}>
            <Text
              fontSize='clamp(1.125rem, 0.5485rem + 2.0963vw, 2.8125rem)'
              color='white'
              lineHeight={1}
              fontWeight={500}
              textAlign='center'
            >
              Ми рухаємося швидко та впевнено. Ви можете довірити нам:
            </Text>
          </motion.div>

          <motion.div
            variants={gridVariants}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              width='100%'
              height='100%'
              marginTop='30px'
              maxW={{
                base: "550px",
                md: "1200px",
              }}
              justifyItems='stretch'
              gridTemplateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
              }}
              gridTemplateRows={{
                base: "repeat(6, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              columnGap='90px'
              rowGap='10px'
              alignItems='center'
              gridAutoFlow='column'
            >
              {listItems.map((item, idx) => {
                return (
                  <motion.div
                    key={idx}
                    variants={createItemVariants(idx, isMobile)}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <ListItem title={item} number={`0${idx + 1}`} />
                  </motion.div>
                );
              })}
            </Grid>
          </motion.div>
        </Container>

        {/* Animated Keywords Section */}
        <motion.div variants={keywordsVariants}>
          <Box
            marginTop={{ base: "30px", md: "90px" }}
            width='100%'
            height='40px'
            position='relative'
            display='flex'
            justifyContent='center'
            alignItems='center'
            bg='transparent'
          >
            <motion.div
              style={{
                display: "flex",
                gap: isMobile ? "30px" : "60px",
                whiteSpace: "nowrap",
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                alignItems: "center",
              }}
              animate={{
                x: [-1200, 0], // This creates right-to-left movement
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* First set of keywords */}
              {keywords.map((item, idx) => (
                <motion.div
                  key={`first-${idx}`}
                  whileHover={{
                    scale: 1.1,
                    color: "#ffffff",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Text
                    fontSize='clamp(0.875rem, 0.5761rem + 1.087vw, 1.75rem)'
                    color='gray1'
                    lineHeight={1}
                    fontWeight={400}
                    flexShrink={0}
                    opacity={0.8}
                    cursor='pointer'
                  >
                    {item}
                  </Text>
                </motion.div>
              ))}

              {/* Second set for seamless loop */}
              {keywords.map((item, idx) => (
                <motion.div
                  key={`second-${idx}`}
                  whileHover={{
                    scale: 1.1,
                    color: "#ffffff",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Text
                    fontSize='clamp(0.875rem, 0.5761rem + 1.087vw, 1.75rem)'
                    color='gray1'
                    lineHeight={1}
                    fontWeight={400}
                    flexShrink={0}
                    opacity={0.8}
                    cursor='pointer'
                  >
                    {item}
                  </Text>
                </motion.div>
              ))}

              {/* Third set to ensure seamless loop */}
              {keywords.map((item, idx) => (
                <motion.div
                  key={`third-${idx}`}
                  whileHover={{
                    scale: 1.1,
                    color: "#ffffff",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Text
                    fontSize='clamp(0.875rem, 0.5761rem + 1.087vw, 1.75rem)'
                    color='white'
                    lineHeight={1}
                    fontWeight={400}
                    flexShrink={0}
                    opacity={0.8}
                    cursor='pointer'
                  >
                    {item}
                  </Text>
                </motion.div>
              ))}
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};
