import { Box, Button, Text } from "@chakra-ui/react";
import TwoLinesIcon from "../assets/form-lines.svg?react";

export const FormFloating = () => {
  return (
    <Box
      position='fixed'
      bottom='20px'
      left='50%'
      transform='translateX(-50%)'
      width={{
        base: "305px",
        md: "385px",
      }}
      height='60px'
      padding='5px'
      backgroundColor='rgba(31 31 31 0.4)'
      backdropFilter='blur(5px)'
      borderRadius='20px'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      zIndex='9'
    >
      <Text
        fontSize={{
          base: "14px",
          md: "16px",
        }}
        color='white'
        paddingLeft='20px'
        letterSpacing='0.16px'
      >
        Розкажіть нам про свої потреби
      </Text>
      <Button
        bg='#16161A'
        borderRadius='15px'
        width='50px'
        height='50px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        _hover={{ bg: "gray1", color: "white" }}
      >
        <TwoLinesIcon />
      </Button>
    </Box>
  );
};
