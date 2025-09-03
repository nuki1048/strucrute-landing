import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { ScrollRevealText } from "../AnimatedTextReveal/ScrollRevealText";
import BrightTextRichLinesScroll from "../AnimatedTextReveal/ScrollRevealByLinesText";

export const Welcome = () => {
  const isMobile = useMediaQuery(["(max-width: 768px)"]);
  const text = `<i>Structure Agency</i> - cтудія дизайну та <br> розробки цифрових продуктів. Ми <br> прагнемо створювати користувацький <br> досвід  та <i>структури</i>, які формують ${
    isMobile ? "" : "<br>"
  }майбутнє ${isMobile ? "<br>" : ""} вашого бізнесу`;

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
      h={{ base: "100%", md: "1100px" }}
      paddingX={{
        base: "15px",
        md: "15px",
        lg: "92px",
        xl: "92px",
      }}
      id='welcome'
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
        <Box
          w='100%'
          borderRadius='10px'
          paddingTop={{ base: "18%", md: "22%" }}
          paddingLeft={{ base: "0", md: "4%" }}
        >
          <ScrollRevealText
            sx={{
              fontSize: "clamp(3.125rem, 2.2589rem + 3.6955vw, 6.25rem)",
              textTransform: "uppercase",
              color: "white",
              fontWeight: 300,
            }}
            dimColor='rgba(255,255,255,0)'
            text='Вітаємо'
          />
        </Box>
        <Box
          w='100%'
          borderRadius='10px'
          maxW={{
            base: "320px",
            md: "320px",
            lg: "850px",
            xl: "850px",
          }}
          paddingTop={{ base: "95px", md: "150px" }}
          display='flex'
          flexDirection='column'
        >
          <BrightTextRichLinesScroll
            text={text}
            fontSize='clamp(1.25rem, 0.7162rem + 1.941vw, 2.8125rem)'
            color='white'
            lineHeight='1'
            dimColor='rgba(255,255,255,0)'
            glow='0 0 18px rgba(255,255,255,.18)'
            italicFontFamily='notoSerif'
            hideUntilStart={true}
            fontWeight={300}
            strictHideMode='unmount'
            snapMode='enter' // ← snaps to fully bright once visible
            id='section-2-end'
          />
          {/* <Text
            fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            Ми -
            <Text
              as='span'
              fontStyle='italic'
              fontFamily='notoSerif'
              letterSpacing={{ base: "1.1px", md: "initial" }}
            >
              STRUCTURE AGENCY
            </Text>
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
          >
            Cтудія дизайну та розробки
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1.2'
            fontWeight={300}
          >
            цифрових продуктів
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1.3'
            fontWeight={300}
          >
            Ми прагнемо створювати {isMobile ? <br /> : " "} досвід{" "}
            {isMobile ? "Та структури, які формують майбутнє" : ""}
          </Text>
          <Text
            fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
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
            fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            {isMobile ? "" : "майбутнє"} вашого бізнесу
          </Text> */}
        </Box>
      </Container>
    </Box>
  );
};
