import { Box, HStack, useMediaQuery } from "@chakra-ui/react";
import { Logo } from "../Logo/Logo";
import { useEffect, useState } from "react";
import { HeaderLinks } from "./HeaderLinks";
import HamburgerIcon from "../../assets/menu-icon.svg?react";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]) ?? true;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Box
      w='100%'
      h={isMobile ? "auto" : "100px"}
      display='flex'
      justifyContent='space-between'
      alignItems={isMobile ? "flex-start" : "center"}
      paddingX={{
        base: "28px",
        md: "28px",
        lg: "92px",
        xl: "92px",
      }}
      position='relative'
      zIndex={10}
    >
      <Logo />
      {isMobile ? (
        <Box
          cursor='pointer'
          onClick={handleOpen}
          borderRadius='md'
          _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
          transition='all 0.2s ease'
          m={0}
          p={0}
        >
          <HamburgerIcon style={{ width: "28px", height: "28px" }} />
        </Box>
      ) : (
        <HStack gap={35} justifyContent='space-between'>
          <HeaderLinks />
        </HStack>
      )}

      <MobileMenu isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
};
