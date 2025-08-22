import { Box, Container, Image, Span, Text } from "@chakra-ui/react";
import Sphere from "../assets/sphere.png";

export const Promo = () => {
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
      h='700px'
      paddingX='92px'
    >
      <Image
        src={Sphere}
        alt='Sphere'
        w='660px'
        h='740px'
        p='0'
        style={{
          position: "absolute",
          top: "-4%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />
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
        <Box alignSelf='flex-start' justifySelf='center' marginTop='150px'>
          <Text
            fontFamily='secondary'
            fontWeight='700'
            fontSize='80px'
            color='text'
            textTransform='uppercase'
            zIndex={2}
            marginLeft='130px'
          >
            Structure
          </Text>
        </Box>
        <Box
          w='100%'
          display='flex'
          justifyContent='space-between'
          marginTop='90px'
          paddingLeft={{ lg: "160px", xl: "140px" }}
        >
          <Text
            color='text'
            fontSize='25px'
            fontWeight='300'
            textTransform='uppercase'
            zIndex={2}
            textAlign='center'
          >
            [VISUAL DESIGN]
          </Text>
          <Text
            color='text'
            fontSize='25px'
            fontWeight='300'
            textTransform='uppercase'
            zIndex={2}
            textAlign='center'
          >
            [WEB and mobile DEVELOPMENT]
          </Text>
        </Box>
        <Box marginTop='auto' alignSelf='flex-start'>
          <Text
            color='text'
            fontSize='49px'
            fontWeight='400'
            textTransform='uppercase'
            zIndex={2}
            maxW='1000px'
            lineHeight='1.5'
          >
            Ми СТВОРЮЄМО{" "}
            <Span
              fontFamily='secondary'
              fontSize='50px'
              fontWeight='400'
              color='text'
              fontStyle='italic'
              textTransform='uppercase'
            >
              ціфрові продукти
            </Span>
            , які допомагають брендам зростати
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
