import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import BrightTextRichLines from "../AnimatedTextReveal/AnimatedTextByLines";
import BrightTextRich from "../AnimatedTextReveal/AnimatedText";
import { useTranslation } from "react-i18next";
import { lazy } from "react";
const SphereScene = lazy(() => import("../Sphere/AnimatedScene"));

export const Promo = () => {
  const { t } = useTranslation();
  const [isMobile, isTablet] = useMediaQuery([
    "(max-width: 768px)",
    "(max-width: 1024px)",
  ]);

  const getBottomOffset = () => {
    if (isMobile) return -400;
    if (isTablet) return -400;
    return -150;
  };
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
      <Box
        position='absolute'
        top={{ base: "-26%", md: "-20%" }}
        left='0'
        right='0'
        bottom='0'
        w='100%'
        h={{
          base: "1400px",
          md: "1600px",
          lg: "2000px",
          xl: "2000px",
        }}
        zIndex={1}
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
          startTopPadding={isMobile ? 100 : 100}
          clampToViewport={false}
          endYOffset={getBottomOffset()}
          layers={isMobile ? 80 : 120}
          sphereWidth={660}
          sphereHeight={740}
          layerSpeedJitter={isMobile ? 3 : 7}
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
            base: "0",
            md: "45px",
            lg: "150px",
            xl: "120px",
          }}
        >
          <BrightTextRich
            text={t("structure")}
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
            as='h1'
            dimColor='rgba(255,255,255,0)'
          />
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
          <BrightTextRich
            color='text'
            fontSize='clamp(0.75rem, 0.5792rem + 0.6211vw, 1.25rem)'
            fontWeight='300'
            textTransform='uppercase'
            zIndex={2}
            textAlign='center'
            text='[VISUAL DESIGN]'
            delay={0.4}
            dimColor='rgba(255,255,255,0)'
          />
          <BrightTextRich
            color='text'
            fontSize='clamp(0.75rem, 0.5792rem + 0.6211vw, 1.25rem)'
            fontWeight='300'
            textTransform='uppercase'
            zIndex={2}
            textAlign='center'
            text='[WEB and mobile DEVELOPMENT]'
            delay={0.4}
            dimColor='rgba(255,255,255,0)'
          />
        </Box>
        <Box marginTop={{ base: "150px", md: "60px" }} alignSelf='flex-start'>
          <BrightTextRichLines
            text={t("promo.description", {
              mobileBR: isMobile ? "<br>" : "",
              desktopBR: isMobile ? "" : "<br>",
            })}
            fontSize='clamp(2rem, 1.6882rem + 1.3304vw, 3.125rem)'
            fontWeight='300'
            color='whiteAlpha.900' // wrapper color (lines override via animated style)
            dimColor='rgba(0,0,0,0)' // starts fully transparent
            glow='0 0 22px rgba(255,255,255,.22)'
            italicFontFamily='notoSerif'
            strictHideMode='unmount'
          />
        </Box>
      </Container>
    </Box>
  );
};
