import { Box, Image, Text } from "@chakra-ui/react";
import anyScreen from "../assets/mockup-big.svg";

export const AnyScreen = () => {
  return (
    <Box
      marginTop='200px'
      display='flex'
      flexDirection='column'
      paddingX='92px'
      gap='12px'
    >
      <Text fontSize='90px' fontWeight='400' color='gray2' textAlign='center'>
        ОДИН ПРОДУКТ. БУДЬ-ЯКИЙ ЕКРАН.
      </Text>
      <Image src={anyScreen} alt='any-screen' width='100%' height='100%' />
    </Box>
  );
};
