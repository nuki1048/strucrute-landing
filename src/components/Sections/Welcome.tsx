import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { ScrollRevealText } from "../AnimatedTextReveal/ScrollRevealText";
import BrightTextRichLinesScroll from "../AnimatedTextReveal/ScrollRevealByLinesText";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";

export const Welcome = () => {
  const { t } = useTranslation();
  const { deviceType } = useCommonDeviceProps();
  const isMobile = useMediaQuery(["(max-width: 768px)"]);
  const text = t("welcome-description", {
    mobileBR: isMobile ? "<br>" : "",
  });

  useEffect(() => {
    track("view_welcome", { deviceType });
  }, [deviceType]);

  return (
    <Box
      position='relative'
      display='flex'
      justifyContent={{
        lg: "flex-start",
        xl: "flex-end",
        "2xl": "center",
      }}
      paddingY='20px'
      w='100%'
      h={{ base: "100%", md: "900px", lg: "1100px" }}
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
        alignItems={{
          base: "flex-start",
          md: "flex-end",
          lg: "flex-end",
          xl: "flex-end",
        }}
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
            text={t("welcome")}
            offset={["start 85%", "end 40%"]}
          />
        </Box>
        <Box
          position='relative'
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
            snapMode='enter'
            id='section-2-end'
            offset={["start 85%", "end 60%"]}
          />
        </Box>
      </Container>
    </Box>
  );
};
