import { Box, HStack, Link } from "@chakra-ui/react";
import Logo from "../assets/logo.svg?react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
  return (
    <Box
      w='100%'
      h='100px'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      paddingX='92px'
      position='relative'
      zIndex={10}
    >
      <Logo />
      <HStack gap={35} justifyContent='space-between'>
        <Link
          href='#'
          fontSize='18px'
          color='text'
          transition='all 0.1s ease'
          _hover={{
            textDecoration: "none",
            color: "gray1",
          }}
        >
          Про нас
        </Link>
        <Link
          href='#'
          fontSize='18px'
          color='text'
          transition='all 0.1s ease'
          _hover={{
            textDecoration: "none",
            color: "gray1",
          }}
        >
          Консультація
        </Link>
        <LanguageSwitcher />
      </HStack>
    </Box>
  );
};
