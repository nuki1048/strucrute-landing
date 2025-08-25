import { Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { BoxGrid } from "./BoxGrid";

export const Info = () => {
  const isMoreThan1440 = useMediaQuery(["(min-width: 1440px)"]);
  return (
    <Grid
      paddingX='65px'
      gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'
      gridTemplateRows='repeat(5,250px)'
      w='100%'
      h='980px'
      marginTop='120px'
      gap={4}
    >
      <BoxGrid
        gridColumn='1 / 2'
        gridRow='1 / 2'
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        hoverText='допомагає компанії виділитися, бути впізнаваною та викликати правильні емоції в аудиторії'
        hoverTextAlign='left'
        hoverTextTop='30%'
        hoverTextRight={isMoreThan1440 ? "-30%" : "-15%"}
      >
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='primary'
          lineHeight={1.5}
        >
          Візуальна
        </Text>
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={0.5}
        >
          ідентичність
        </Text>
      </BoxGrid>
      <BoxGrid
        gridColumn='2 / 3'
        gridRow='1 / 2'
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
        marginTop='110px'
        hoverText='створення сайтів та веб-додатків: від простих лендингів до складних сервісів'
        hoverTextAlign='right'
        hoverTextLeft={isMoreThan1440 ? "18%" : "30%"}
      >
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
          fontStyle='italic'
          textAlign='right'
        >
          Web
        </Text>
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={0.7}
        >
          розробка
        </Text>
      </BoxGrid>
      <BoxGrid
        gridColumn='1 / 3'
        gridRow='2 / 3'
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        marginTop='110px'
        hoverText='хороший UI/UX робить взаємодію простою та приємною'
        hoverTextAlign='left'
        hoverTextRight={isMoreThan1440 ? "23%" : "30%"}
      >
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
        >
          <Text
            as='span'
            fontStyle='italic'
            fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
            textTransform='uppercase'
            color='white'
          >
            Ui/Ux
          </Text>{" "}
          дизайн
        </Text>
      </BoxGrid>
      <BoxGrid
        gridColumn='1 /3'
        gridRow='3 / 4'
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
        justifyContent='flex-end'
        hoverText='зручні, безпечні та масштабовані рішення для бізнесу будь-якого рівня'
        hoverTextAlign='right'
        hoverTextLeft={isMoreThan1440 ? "24%" : "30%"}
        hoverTextTop='30%'
      >
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
        >
          <Text as='span' fontStyle='italic' color='primary'>
            E-
          </Text>
          Commerce
        </Text>
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={0.7}
          textAlign='right'
        >
          Рішення
        </Text>
      </BoxGrid>
      <BoxGrid
        gridColumn='1 / 2'
        gridRow='3 / 5'
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='flex-end'
        alignSelf='center'
        maxWHoverText='250px'
        hoverText='робить продукт більш сучасним, залучаючим та зрозумілим для користувача'
        hoverTextAlign='left'
        hoverTextRight={isMoreThan1440 ? "5%" : "15%"}
        hoverTextBottom='-25%'
        hoverTextTop='none'
      >
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
        >
          Інтерактивний
        </Text>
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={0.5}
        >
          Дизайн
        </Text>
      </BoxGrid>
    </Grid>
  );
};
