import { Box, Button, Grid, Link, Separator, Text } from "@chakra-ui/react";
import BehanceIcon from "../../assets/behance-icon.svg?react";
import DribbleIcon from "../../assets/dribble-icon.svg?react";
import LinkedinIcon from "../../assets/linkedin-icon.svg?react";
import { useTranslation } from "react-i18next";
export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      width='100%'
      height='180px'
      paddingX={{
        base: "24px",
        md: "92px",
      }}
      marginTop={{ base: "0px", md: "120px" }}
      paddingTop='25px'
      paddingBottom={{ base: "25px", md: "15px" }}
      id='footer'
    >
      <Separator
        borderColor='gray4'
        marginBottom={{ base: "20px", md: "30px" }}
        borderWidth='1px'
      />
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
          >
            STRUCTURE
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
          fontSize='clamp(0.75rem, 0.7073rem + 0.1553vw, 0.875rem)'
          fontWeight='regular'
          color='gray1'
          textAlign='center'
          alignSelf={{ base: "flex-start", md: "center" }}
          justifySelf='center'
          gridRow={{ base: "2", md: "1" }}
          gridColumn={{ base: "1/3", md: "2" }}
        >
          © 2025 {t("footer.structure")}. {t("footer.all-rights-reserved")}
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
          >
            {t("footer.email")}
          </Link>
          <Text
            fontSize='clamp(0.75rem, 0.6646rem + 0.3106vw, 1rem)'
            fontWeight='regular'
            color='gray1'
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
            >
              <BehanceIcon />
            </Button>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
            >
              <DribbleIcon />
            </Button>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
            >
              <LinkedinIcon />
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
