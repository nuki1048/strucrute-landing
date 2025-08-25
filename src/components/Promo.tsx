import { Box, Container, Text, Span } from "@chakra-ui/react";
import SphereScene from "./SphereScene";

export const Promo = () => {
  return (
    <Box
      id='hero'
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
      {/* Dynamic Sphere Component - Full Width Background */}
      <Box
        position='absolute'
        top='-20%'
        left='-10%'
        right='-10%'
        bottom='-10%'
        w='120vw'
        h='2000px'
        zIndex={1}
        overflow='visible'
      >
        <SphereScene
          scrollStartSelector='#hero'
          scrollEndSelector='#section-2'
          minScale={0.95}
          maxScale={1.35}
          startTopPadding={200}
          endYOffset={-600}
          layers={120}
          sphereWidth={660}
          sphereHeight={740}
          layerSpeedJitter={7}
          layerPhaseJitter={10}
          spinSpeed={0.1}
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
