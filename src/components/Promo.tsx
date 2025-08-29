import { Box, Container, Text, Span, useMediaQuery } from "@chakra-ui/react";
import SphereScene from "./SphereScene";

export const Promo = () => {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  return (
    <Box
      id='hero'
      position='relative'
      display='flex'
      marginTop={{ base: "115px", md: "0" }}
      justifyContent={{
        lg: "flex-end",
        xl: "flex-end",
        "2xl": "center",
      }}
      paddingY='20px'
      w='100%'
      h='700px'
      paddingX={{
        base: "30px",
        lg: "92px",
        xl: "92px",
      }}
    >
      {/* Dynamic Sphere Component - Full Width Background */}
      <Box
        position='absolute'
        top={{ base: "-26%", md: "-20%" }}
        left='-10%'
        right='-10%'
        bottom='-10%'
        w='120vw'
        h={{
          base: "1500px",
          lg: "2000px",
          xl: "2000px",
        }}
        zIndex={1}
        overflow='visible'
        style={{
          WebkitMaskImage: `
            radial-gradient(140% 120% at 50% 62%, #000 52%, rgba(0,0,0,0.85) 70%, transparent 100%),
            linear-gradient(to bottom, #000 85%, transparent 100%)
          `,
          maskImage: `
            radial-gradient(140% 120% at 50% 62%, #000 52%, rgba(0,0,0,0.85) 70%, transparent 100%),
            linear-gradient(to bottom, #000 85%, transparent 100%)
          `,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <SphereScene
          scrollStartSelector='#hero'
          scrollEndSelector='#section-2-end'
          minScale={isMobile ? 0.45 : 0.8}
          maxScale={isMobile ? 1.2 : 5}
          startTopPadding={isMobile ? 200 : 100}
          clampToViewport={false}
          endYOffset={isMobile ? -400 : -150}
          layers={120}
          sphereWidth={660}
          sphereHeight={740}
          layerSpeedJitter={7}
          layerPhaseJitter={10}
          spinSpeed={0.1}
          fadeOutFromProgress={50}
        />
      </Box>

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
        zIndex={5}
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
      >
        <Box
          alignSelf='flex-start'
          justifySelf='center'
          marginTop={{
            base: "65px",
            md: "45px",
            lg: "150px",
            xl: "120px",
          }}
        >
          <Text
            fontFamily='inter'
            fontWeight='700'
            fontSize='clamp(3.125rem, 2.6053rem + 2.2173vw, 5rem)'
            color='text'
            textTransform='uppercase'
            zIndex={2}
            lineHeight={{ base: "1", md: "initial" }}
            letterSpacing={{ base: "-1.2px", md: "initial" }}
            marginLeft={{
              base: "0",
              md: "0",
              lg: "130px",
              xl: "130px",
            }}
          >
            Structure
          </Text>
        </Box>
        <Box
          w='100%'
          display='flex'
          gap='43px'
          justifyContent={{
            base: "flex-start",
            lg: "space-between",
            xl: "space-between",
          }}
          marginTop={{
            base: "0",
            md: "0",
            lg: "60px",
            xl: "60px",
          }}
          paddingLeft={{
            base: "0",

            xl: "12%",
          }}
        >
          <Text
            color='text'
            fontSize='clamp(0.75rem, 0.5792rem + 0.6211vw, 1.25rem)'
            fontWeight='300'
            textTransform='uppercase'
            zIndex={2}
            textAlign='center'
          >
            [VISUAL DESIGN]
          </Text>
          <Text
            color='text'
            fontSize='clamp(0.75rem, 0.5792rem + 0.6211vw, 1.25rem)'
            fontWeight='300'
            textTransform='uppercase'
            zIndex={2}
            textAlign='center'
          >
            [WEB and mobile DEVELOPMENT]
          </Text>
        </Box>
        <Box marginTop={{ base: "193px", md: "60px" }} alignSelf='flex-start'>
          <Text
            color='text'
            fontSize='clamp(2rem, 1.6882rem + 1.3304vw, 3.125rem)'
            fontWeight='400'
            textTransform='uppercase'
            zIndex={2}
            maxW='1000px'
            lineHeight={{ base: "1.2", md: "1.5" }}
          >
            Ми СТВОРЮЄМО {isMobile ? <br /> : " "}
            <Span
              fontFamily='notoSerif'
              fontSize='clamp(2rem, 1.6882rem + 1.3304vw, 3.125rem)'
              fontWeight='400'
              color='text'
              fontStyle='italic'
              textTransform='uppercase'
            >
              ціфрові продукти,
            </Span>
            {isMobile ? <br /> : " "} які допомагають брендам зростати
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
