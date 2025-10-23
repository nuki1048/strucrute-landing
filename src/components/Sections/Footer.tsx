import { Box, Button, Grid, Link, Separator, Text } from "@chakra-ui/react";
import BehanceIcon from "../../assets/behance-icon.svg?react";
import InstagramIcon from "../../assets/instagram-icon.svg?react";
import { useTranslation } from "react-i18next";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import { track } from "@vercel/analytics";
import { useEffect } from "react";

export const Footer = () => {
  const commonProps = useCommonDeviceProps();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  useEffect(() => {
    track("footer_view", { ...commonProps });
  }, [commonProps]);

  return (
    <Box
      width='100%'
      height='180px'
      paddingX={{
        base: "24px",
        md: "92px",
      }}
      marginTop={{ base: "0px", lg: "60px" }}
      paddingTop='25px'
      paddingBottom={{ base: "25px", md: "15px" }}
      id='footer'
    >
      <Separator borderColor='gray4' marginBottom='10px' borderWidth='1px' />
      <Grid
        width='100%'
        height='100%'
        gridTemplateColumns={{
          base: "1fr 1fr",
          md: "repeat(3, 1fr)",
        }}
        gridTemplateRows={{
          base: "1fr 1fr",
          md: "1fr",
        }}
        columnGap='10px'
        rowGap='30px'
        alignItems='center'
        justifyContent={{ base: "space-between", md: "center" }}
      >
        <Box display='flex' flexDirection='column' gap='10px'>
          <Text
            fontSize='clamp(1.125rem, 1.0396rem + 0.3106vw, 1.375rem)'
            fontWeight='700'
            color='white'
            textAlign='left'
            textTransform='uppercase'
          >
            {t("structure")}
          </Text>
          <Text
            fontSize='clamp(0.75rem, 0.6646rem + 0.3106vw, 1rem)'
            fontWeight='regular'
            color='gray1'
          >
            {t("footer.description")}
          </Text>
        </Box>
        <Text
          as='h3'
          fontSize='clamp(0.75rem, 0.7073rem + 0.1553vw, 0.875rem)'
          fontWeight='regular'
          color='gray1'
          textAlign='center'
          alignSelf={{ base: "flex-start", md: "center" }}
          justifySelf='center'
          gridRow={{ base: "2", md: "1" }}
          gridColumn={{ base: "1/3", md: "2" }}
        >
          © {year} {t("footer.structure")}. {t("footer.all-rights-reserved")}
        </Text>
        <Box
          display='flex'
          flexDirection='column'
          gap='10px'
          alignItems='flex-end'
        >
          <Link
            href='mailto:agency@strctr.dev'
            fontSize='16px'
            fontWeight='regular'
            color='white'
            data-exit-trigger='email'
            onClick={() => {
              track("email_click", { ...commonProps });
            }}
          >
            {t("footer.email")}
          </Link>
          <Text
            fontSize='clamp(0.75rem, 0.6646rem + 0.3106vw, 1rem)'
            fontWeight='regular'
            color='gray1'
            data-exit-trigger='location'
          >
            {t("footer.location")}
          </Text>
          <Box display='flex' gap='20px'>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
              onClick={() => {
                track("instagram_click", { ...commonProps });
                window.open(
                  "https://www.instagram.com/strctr.agency/",
                  "_blank"
                );
              }}
              data-exit-trigger='instagram'
            >
              <InstagramIcon />
            </Button>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
              onClick={() => {
                track("behance_click", { ...commonProps });
                window.open("https://www.behance.net/9b0e5eb2", "_blank");
              }}
              data-exit-trigger='behance'
            >
              <BehanceIcon />
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
