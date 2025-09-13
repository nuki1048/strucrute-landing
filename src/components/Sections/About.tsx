import { Box, Container, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { ListItem } from "../ListItem";
import { motion, easeOut } from "framer-motion";
import { Marquee } from "./Marquee";
import {
  containerVariants,
  gridVariants,
  textVariants,
} from "../../animations/about";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";

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

const createItemVariants = (index: number, isMobile: boolean) => {
  if (isMobile) {
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
          delay: 0.4 + index * 0.1,
        },
      },
    };
  } else {
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
          delay: lineIndex * 0.2,
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
  const { t } = useTranslation();
  const commonProps = useCommonDeviceProps();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const listItems = [
    t("about.ui-ux-design"),
    t("about.web-applications"),
    t("about.mobile-applications"),
    t("about.security-and-reliability"),
    t("about.interactive-solutions"),
    t("about.continuous-support-and-development"),
  ];

  useEffect(() => {
    track("view_about", { ...commonProps });
  }, [commonProps]);

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      exit='exit'
      viewport={{ amount: 0.6 }}
      variants={containerVariants}
    >
      <Box
        position='relative'
        display='flex'
        flexDirection='column'
        alignItems='center'
        paddingY='20px'
        w='100%'
        marginTop='150px'
        overflow='hidden'
        paddingX={{ base: "40px", sm: "100px", xl: "250px" }}
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
              fontSize='clamp(1.5625rem, 0.7298rem + 3.028vw, 4rem)'
              color='white'
              lineHeight={1}
              fontWeight={500}
              width={{ base: "300px", sm: "fit-content" }}
              textWrap={{ base: "wrap", md: "nowrap" }}
            >
              {t("about.we-move-fast")}
              {!isMobile && <br />}
              {t("about.you-can-trust-us-with")}
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

        <motion.div variants={keywordsVariants}>
          <Box
            mt={{ base: "30px", md: "90px" }}
            w='100%'
            h='40px'
            position='relative'
            overflow='hidden'
            display='flex'
            alignItems='center'
            bg='transparent'
          >
            <Marquee
              items={keywords}
              gapPx={isMobile ? 30 : 60}
              speedPxPerSec={80}
            />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};
