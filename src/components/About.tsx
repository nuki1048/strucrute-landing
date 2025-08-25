import { Box, Container, Grid, Text } from "@chakra-ui/react";
import { ListItem } from "./ListItem";
import { motion } from "framer-motion";

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

export const About = () => {
  return (
    <Box
      position='relative'
      display='flex'
      flexDirection='column'
      alignItems='center'
      paddingY='20px'
      w='100%'
      h='630px'
      marginTop='104px'
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
        marginX='0'
        zIndex={2}
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
        paddingX='92px'
      >
        <Text fontSize='42px' color='white' lineHeight={1} fontWeight={300}>
          Ми рухаємося швидко та впевнено. Ви можете довірити нам:
        </Text>
        <Grid
          marginTop='30px'
          maxW='1200px'
          marginX='auto'
          gridTemplateColumns='repeat(2, 1fr)'
          gridTemplateRows='repeat(3, 1fr)'
          columnGap='90px'
          rowGap='10px'
          justifyItems='center'
          alignItems='center'
          gridAutoFlow='column'
        >
          {listItems.map((item, idx) => {
            return <ListItem key={idx} title={item} number={`0${idx + 1}`} />;
          })}
        </Grid>
      </Container>

      {/* Animated Keywords Section */}
      <Box
        marginTop='90px'
        width='100%'
        height='40px'
        position='relative'
        bg='transparent'
      >
        <motion.div
          style={{
            display: "flex",
            gap: "60px",
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
            <Text
              key={`first-${idx}`}
              fontSize='26px'
              color='gray1'
              lineHeight={1}
              fontWeight={400}
              flexShrink={0}
              opacity={0.8}
            >
              {item}
            </Text>
          ))}

          {/* Second set for seamless loop */}
          {keywords.map((item, idx) => (
            <Text
              key={`second-${idx}`}
              fontSize='26px'
              color='gray1'
              lineHeight={1}
              fontWeight={400}
              flexShrink={0}
              opacity={0.8}
            >
              {item}
            </Text>
          ))}

          {/* Third set to ensure seamless loop */}
          {keywords.map((item, idx) => (
            <Text
              key={`third-${idx}`}
              fontSize='26px'
              color='white'
              lineHeight={1}
              fontWeight={400}
              flexShrink={0}
              opacity={0.8}
            >
              {item}
            </Text>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};
