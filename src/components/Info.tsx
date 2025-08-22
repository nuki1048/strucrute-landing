import { Grid, Text } from "@chakra-ui/react";
import { BoxGrid } from "./BoxGrid";

export const Info = () => {
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
      >
        <Text
          fontSize={{ base: "60px", md: "80px", lg: "100px", xl: "120px" }}
          textTransform='uppercase'
          color='white'
          lineHeight={1.5}
          fontStyle='italic'
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
