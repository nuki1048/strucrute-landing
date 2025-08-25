import { Box, Container, Text } from "@chakra-ui/react";

export const Welcome = () => {
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
      h='1300px'
      paddingX='92px'
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
        alignItems='flex-end'
      >
        <Box w='100%' borderRadius='10px' paddingTop='22%' paddingLeft='4%'>
          <Text
            fontSize='100px'
            textTransform='uppercase'
            color='white'
            fontWeight={300}
          >
            Вітаємо
          </Text>
        </Box>
        <Box
          w='100%'
          borderRadius='10px'
          maxW='950px'
          paddingTop='150px'
          display='flex'
          flexDirection='column'
        >
          <Text
            fontSize='50px'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            Ми -
            <Text as='span' fontStyle='italic' fontWeight={400}>
              STRUCTURE AGENCY
            </Text>
          </Text>
          <Text
            fontSize='50px'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
          >
            Cтудія дизайну та розробки
          </Text>
          <Text
            fontSize='50px'
            textTransform='uppercase'
            color='white'
            lineHeight='1.2'
            fontWeight={300}
          >
            цифрових продуктів
          </Text>
          <Text
            fontSize='50px'
            textTransform='uppercase'
            color='white'
            lineHeight='1.3'
            fontWeight={300}
          >
            Ми прагнемо створювати досвід
          </Text>
          <Text
            fontSize='50px'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            Та структури, які формують
          </Text>
          <Text
            id='section-2'
            fontSize='50px'
            textTransform='uppercase'
            color='white'
            lineHeight='1'
            fontWeight={300}
          >
            майбутнє вашого бізнесу
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
