import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import { BoxGrid } from "../BoxGrid";
import { RevealText } from "../AnimatedTextReveal/ScrollText";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";

export const Info = () => {
  const { t, i18n } = useTranslation();
  const commonProps = useCommonDeviceProps();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const isEnglish = useMemo(() => i18n.language === "en", [i18n.language]);
  const textMode = useMemo(() => (isMobile ? "word" : "letter"), [isMobile]);

  useEffect(() => {
    track("view_info", { ...commonProps });
  }, [commonProps]);

  return (
    <Box position='relative' marginTop={{ base: "100px", md: "0" }}>
      {isMobile && (
        <Box
          fontSize='0.875rem'
          color='white'
          borderRadius='8px'
          textAlign='center'
        >
          {t("info.mobile-hover-text")}
        </Box>
      )}
      <Grid
        paddingX={{ base: "20px", md: "35px", "2xl": "65px" }}
        gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'
        gridTemplateRows={{
          base: "repeat(5,min-content)",
          md: "repeat(4,min-content)",
          lg: "repeat(5,min-content)",
        }}
        gridAutoRows='min-content'
        w='100%'
        gap={{ base: "15px", md: "15px" }}
      >
        <BoxGrid
          gridColumn='1 / 2'
          gridRow='1 / 2'
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          hoverText={t("info.visual-identity-description")}
          hoverTextAlign={isMobile ? "right" : "left"}
          hoverTextTop={{ base: "50%", md: "20%", lg: "30%" }}
          hoverTextRight={{ base: "-5%", sm: "-30%", md: "-40%", xl: "-30%" }}
          maxWHoverText={{ base: "200px", md: "250px", lg: "380px" }}
          hoverTextPadding={{ base: "0", md: "3" }}
          width='max-content'
        >
          <RevealText
            text={t("info.visual-identity", {
              mobileBreak: isMobile ? "<br>" : "",
            })}
            mode={textMode}
            direction='up'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
            color='white'
            textTransform='uppercase'
            lineHeight={0.95}
            stagger={0.08}
            duration={0.7}
            delay={0.1}
            amount={0.35}
            colorText='primary'
          />
        </BoxGrid>

        <BoxGrid
          gridColumn={{ base: "1 / 2", sm: "2 / 3", md: "2 / 3" }}
          gridRow={{ sm: "2", md: "1 / 2" }}
          display='flex'
          flexDirection='column'
          alignItems='flex-end'
          justifySelf='flex-end'
          transform={{
            base: "translateY(0)",
            md: isEnglish ? "translateY(65px)" : "translateY(100px)",
          }}
          hoverText={t("info.web-and-mobile-development-description")}
          hoverTextAlign='right'
          hoverTextTop={{ base: "30px", sm: "40px", md: "25%" }}
          hoverTextLeft={{
            base: "-40%",
            sm: "-20%",
            md: "10%",
            lg: "20%",
            xl: "-5%",
          }}
          alignSelf={{ base: "center", md: "initial" }}
          maxWHoverText={{ base: "260px", md: "200px", xl: "380px" }}
          hoverTextPadding={{ base: "0", md: "3" }}
          width='max-content'
        >
          <RevealText
            text={t("info.web-and-mobile-development")}
            mode={textMode}
            direction='up'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
            color='white'
            textAlign='right'
            italicFontFamily='notoSerif'
            textTransform='uppercase'
            lineHeight={0.95}
            stagger={0.08}
            duration={0.7}
            delay={0.1}
            amount={0.35}
            trigger='inView'
          />
        </BoxGrid>

        <BoxGrid
          justifyContent={{ base: "center", md: "initial" }}
          gridColumn='1 / 3'
          gridRow={{ base: "3/4", md: "2 / 3" }}
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          transform={{
            base: "translateY(0)",
            sm: "translateY(20px) translateX(25px)",
            md: "translateY(33px)  translateX(25px)",
          }}
          hoverText={t("info.ui-ux-design-description")}
          hoverTextAlign='left'
          height='fit-content'
          hoverTextRight={{ base: "-25%", sm: "-80%", md: "-60%", xl: "-55%" }}
          hoverTextPadding={{ base: "0", md: "3" }}
          maxWHoverText={{ base: "180px", md: "300px", xl: "380px" }}
          hoverTextTop={{ base: "initial", md: "20%", xl: "50%" }}
          hoverTextBottom={{ base: "-50%", md: "initial" }}
          width='max-content'
        >
          <RevealText
            text={t("info.ui-ux-design")}
            mode={textMode}
            direction='up'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
            color='white'
            textTransform='uppercase'
            lineHeight={0.95}
            stagger={0.08}
            duration={0.7}
            delay={0.1}
            amount={0.35}
            trigger='inView'
            textAlign='left'
            italicFontFamily='notoSerif'
          />
        </BoxGrid>

        <BoxGrid
          gridColumn='1 /3'
          gridRow={{ base: "4/5", md: "3/4", xl: "3 / 4" }}
          display='flex'
          flexDirection='column'
          alignItems='flex-end'
          alignSelf='flex-start'
          justifyContent={{ base: "center", md: "flex-end" }}
          hoverText={t("info.e-commerce-solutions-description")}
          hoverTextAlign='right'
          hoverTextLeft={{ base: "-15%", sm: "-20%", md: "-25%", xl: "-60%" }}
          hoverTextBottom={{
            base: "-45%",
            sm: "-60%",
            md: "-20%",
            xl: "initial",
          }}
          hoverTextTop={{ base: "initial", xl: "25%" }}
          maxWHoverText={{ base: "200px", md: "250px", xl: "380px" }}
          justifySelf='flex-end'
          width='max-content'
        >
          <RevealText
            text={t("info.e-commerce-solutions")}
            mode={textMode}
            direction='up'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
            color='white'
            textTransform='uppercase'
            lineHeight={0.95}
            stagger={0.08}
            duration={0.7}
            delay={0.1}
            amount={0.35}
            italicFontFamily='notoSerif'
            trigger='inView'
            textAlign='right'
            colorText='primary'
          />
        </BoxGrid>

        <BoxGrid
          gridColumn='1 / 2'
          gridRow={{ base: "5 / 6", sm: "6", md: "4 / 5", xl: "3 / 5" }}
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          justifyContent='flex-end'
          alignSelf='center'
          maxWHoverText='250px'
          hoverText={t("info.interactive-design-description")}
          hoverTextAlign='left'
          width='max-content'
          transform={{
            sm: "translateY(0)",
            xl: "translateY(105px)",
          }}
          hoverTextRight={{
            base: "0%",
            md: "5%",
            lg: "17%",
          }}
          hoverTextBottom={{
            base: "-60%",
            sm: "-50%",
            md: "-45%",
            lg: "-40%",
            xl: "-25%",
          }}
          hoverTextTop='none'
        >
          <RevealText
            text={t("info.interactive-design")}
            mode={textMode}
            direction='up'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
            color='white'
            textTransform='uppercase'
            lineHeight={0.95}
            stagger={0.08}
            duration={0.7}
            delay={0.1}
            amount={0.35}
            trigger='inView'
            textAlign='left'
            width='max-content'
            colorText='primary'
          />
        </BoxGrid>
      </Grid>
    </Box>
  );
};
