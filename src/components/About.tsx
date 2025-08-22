import { Box, Container, Grid, Text } from "@chakra-ui/react";
import { ListItem } from "./ListItem";

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
            return <ListItem title={item} number={`0${idx + 1}`} />;
          })}
        </Grid>
      </Container>
      <Box
        marginTop='90px'
        display='flex'
        gap='10px'
        width='100%'
        justifyContent='space-between'
      >
        {keywords.map((item) => {
          return (
            <Text fontSize='26px' color='gray1' lineHeight={1} fontWeight={300}>
              {item}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};
