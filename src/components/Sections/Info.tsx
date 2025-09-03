import { Grid, useMediaQuery } from "@chakra-ui/react";
import { BoxGrid } from "../BoxGrid";
import { RevealText } from "../AnimatedTextReveal/ScrollText";

export const Info = () => {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  return (
    <Grid
      paddingX={{ base: "20px", md: "65px" }}
      gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'
      gridTemplateRows={{ base: "repeat(5,100px)", md: "repeat(5,250px)" }}
      gridAutoRows='auto'
      w='100%'
      marginTop={{ base: "100px", md: "0" }}
      h={{ base: "100%", md: "980px" }}
      gap={{ base: "10px", md: "4" }}
    >
      <BoxGrid
        gridColumn='1 / 2'
        gridRow='1 / 2'
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        hoverText='допомагає компанії виділитися, бути впізнаваною та викликати правильні емоції в аудиторії'
        hoverTextAlign={isMobile ? "right" : "left"}
        hoverTextTop={{ base: "30%", md: "20%", lg: "30%" }}
        hoverTextRight={{ base: "-25%", sm: "-30%", md: "-40%", xl: "-30%" }}
        maxWHoverText={{ base: "200px", md: "250px", lg: "380px" }}
        hoverTextPadding={{ base: "0", md: "3" }}
        width='max-content'
      >
        <RevealText
          text={"<c>Візуальна</c><br>ідентичність"}
          mode='letter' // or "word"
          direction='up' // "up" | "down" | "left" | "right"
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          color='white'
          textTransform='uppercase'
          lineHeight={1.1}
          stagger={0.08}
          duration={0.7}
          delay={0.1}
          amount={0.35}
          colorText='primary'
        />
        {/* <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='primary'
          lineHeight={1.5}
        >
          Візуальна
        </Text>
        <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='white'
          lineHeight={0.5}
        >
          ідентичність
        </Text> */}
      </BoxGrid>
      <BoxGrid
        gridColumn={{ base: "1 / 2", sm: "2 / 3", md: "2 / 3" }}
        gridRow='1 / 2'
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
        justifySelf='flex-end'
        marginTop={{ base: "230px", md: "110px" }}
        hoverText='створення сайтів та веб-додатків: від простих лендингів до складних сервісів'
        hoverTextAlign='right'
        hoverTextTop={{ base: "30px", sm: "40px", md: "45%" }}
        hoverTextLeft={{
          base: "-45%",
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
          text={"Web<br>розробка"}
          mode='letter' // or "word"
          direction='up' // "up" | "down" | "left" | "right"
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          color='white'
          textAlign='right'
          textTransform='uppercase'
          lineHeight={1.1}
          stagger={0.08}
          duration={0.7}
          delay={0.1}
          amount={0.35}
          trigger='inView'
        />
        {/* <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
          fontStyle='italic'
          textAlign='right'
          fontFamily='notoSerif'
        >
          Web
        </Text>
        <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='white'
          lineHeight={0.7}
        >
          розробка
        </Text> */}
      </BoxGrid>
      <BoxGrid
        justifyContent={{ base: "center", md: "initial" }}
        gridColumn='1 / 3'
        gridRow={{ base: "3/4", md: "2 / 3" }}
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        marginTop={{ base: "0", xl: "110px" }}
        hoverText='хороший UI/UX робить взаємодію простою та приємною'
        hoverTextAlign='left'
        height='fit-content'
        hoverTextRight={{ base: "-100%", sm: "-80%", md: "-60%", xl: "-55%" }}
        hoverTextPadding={{ base: "0", md: "3" }}
        maxWHoverText={{ base: "180px", md: "300px", xl: "380px" }}
        hoverTextTop={{ base: "initial", md: "20%", xl: "50%" }}
        hoverTextBottom={{ base: "-10%", md: "initial" }}
        width='max-content'
      >
        <RevealText
          text={"<i>Ui/Ux</i> дизайн"}
          mode='letter' // or "word"
          direction='up' // "up" | "down" | "left" | "right"
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          color='white'
          textTransform='uppercase'
          lineHeight={1.1}
          stagger={0.08}
          duration={0.7}
          delay={0.1}
          amount={0.35}
          trigger='inView'
          textAlign='left'
          italicFontFamily='notoSerif'
        />
        {/* <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
        >
          <Text
            as='span'
            fontStyle='italic'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
            textTransform='uppercase'
            color='white'
            fontFamily='notoSerif'
          >
            Ui/Ux
          </Text>{" "}
          {isMobile && <br />}
          дизайн
        </Text> */}
      </BoxGrid>
      <BoxGrid
        gridColumn='1 /3'
        gridRow={{ base: "4/5", md: "2/3", xl: "3 / 4" }}
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
        justifyContent={{ base: "center", md: "flex-end" }}
        hoverText='зручні, безпечні та масштабовані рішення для бізнесу будь-якого рівня'
        hoverTextAlign='right'
        hoverTextLeft={{ base: "-35%", sm: "-20%", md: "-25%", xl: "-60%" }}
        hoverTextBottom={{
          base: "-45%",
          sm: "-60%",
          md: "-20%",
          xl: "initial",
        }}
        hoverTextTop={{ base: "initial", xl: "40%" }}
        maxWHoverText={{ base: "200px", md: "250px", xl: "380px" }}
        justifySelf='flex-end'
        width='max-content'
      >
        <RevealText
          text={"<c>E-</c>commerce<br>рішення"}
          mode='letter' // or "word"
          direction='up' // "up" | "down" | "left" | "right"
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          color='white'
          textTransform='uppercase'
          lineHeight={1.1}
          stagger={0.08}
          duration={0.7}
          delay={0.1}
          amount={0.35}
          trigger='inView'
          textAlign='right'
          colorText='primary'
        />
        {/* <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
          display='flex'
          alignItems='baseline'
        >
          <Text
            as='span'
            fontStyle='italic'
            color='primary'
            display='inline'
            fontFamily='notoSerif'
            fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          >
            E-
          </Text>
          Commerce
        </Text>
        <Text
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          textTransform='uppercase'
          color='white'
          lineHeight={0.7}
          textAlign='right'
        >
          Рішення
        </Text> */}
      </BoxGrid>
      <BoxGrid
        gridColumn='1 / 2'
        gridRow={{ base: "5 / 6", md: "3 / 4", xl: "4 / 5" }}
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='flex-end'
        alignSelf='center'
        maxWHoverText='250px'
        hoverText='робить продукт більш сучасним, залучаючим та зрозумілим для користувача'
        hoverTextAlign='left'
        width='max-content'
        hoverTextRight={{
          base: "-15%",
          sm: "0%",
          md: "5%",
          lg: "17%",
        }}
        hoverTextBottom={{
          base: "-70%",
          sm: "-50%",
          md: "-45%",
          lg: "-40%",
          xl: "-35%",
        }}
        hoverTextTop='none'
      >
        <RevealText
          text={"Інтерактивний<br><c>дизайн</c>"}
          mode='letter' // or "word"
          direction='up' // "up" | "down" | "left" | "right"
          fontSize='clamp(2.8125rem, 1.2112rem + 5.823vw, 7.5rem)'
          color='white'
          textTransform='uppercase'
          lineHeight={1.1}
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
  );
};
