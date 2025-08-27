import { Box, Container, Text, useMediaQuery } from "@chakra-ui/react";

export const Welcome = () => {
  const [isMobile] = useMediaQuery(["(max-width: 1024px)"]);

  return (
    <Box
      position='relative'
      display='flex'
      justifyContent={{
        lg: "flex-end",
        xl: "flex-end",
        "2xl": "center",
      }}
      paddingY='20px'
      w='100%'
      h='1300px'
      paddingX={{
        base: "15px",
        md: "15px",
        lg: "92px",
        xl: "92px",
      }}
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
        paddingX='0'
        marginX='0'
        zIndex={2}
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
      >
        <Box w='100%' borderRadius='10px' paddingTop='22%' paddingLeft='4%'>
          <Text
            fontSize='clamp(3.125rem, 2.2589rem + 3.6955vw, 6.25rem)'
            textTransform='uppercase'
            color='white'
            fontWeight={300}
          >
            Вітаємо
          </Text>
        </Box>
        <Box
          w='100%'
          borderRadius='10px'
          maxW={{
            base: "320px",
            md: "320px",
            lg: "950px",
            xl: "950px",
          }}
          paddingTop='150px'
          display='flex'
          flexDirection='column'
        >
          <Text
            fontSize='clamp(1.25rem, 0.7303rem + 2.2173vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            Ми -
            <Text as='span' fontStyle='italic' fontFamily='notoSerif'>
              STRUCTURE AGENCY
            </Text>
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.7303rem + 2.2173vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
          >
            Cтудія дизайну та розробки
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.7303rem + 2.2173vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1.2'
            fontWeight={300}
          >
            цифрових продуктів
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.7303rem + 2.2173vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1.3'
            fontWeight={300}
          >
            Ми прагнемо створювати {isMobile ? <br /> : " "} досвід{" "}
            {isMobile ? "Та структури, які формують майбутнє" : ""}
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.7303rem + 2.2173vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
            display={isMobile ? "none" : "block"}
          >
            Та структури, які формують
          </Text>
          <Text
            id='section-2-end'
            fontSize='clamp(1.25rem, 0.7303rem + 2.2173vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            {isMobile ? "" : "майбутнє"} вашого бізнесу
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
