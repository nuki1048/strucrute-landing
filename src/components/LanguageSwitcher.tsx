import { useState } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

interface LanguageSwitcherProps {
  onLanguageChange?: (language: "EN" | "UA") => void;
  initialLanguage?: "EN" | "UA";
}

export const LanguageSwitcher = ({
  onLanguageChange,
  initialLanguage = "EN",
}: LanguageSwitcherProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<"EN" | "UA">(
    initialLanguage
  );

  const handleLanguageChange = (language: "EN" | "UA") => {
    setCurrentLanguage(language);
    onLanguageChange?.(language);
  };

  return (
    <Box
      bg='black1'
      borderRadius='full'
      p='2px'
      display='inline-block'
      cursor='pointer'
      userSelect='none'
      position='relative'
      overflow='hidden'
      height='46px'
      width='137px'
    >
      <Box
        position='absolute'
        top='2px'
        left={currentLanguage === "EN" ? "2px" : "50%"}
        w='50%'
        h='calc(100% - 4px)'
        borderRadius='full'
        transition='left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        zIndex={1}
        border='2px solid'
        borderColor='gray1'
      />

      <HStack
        gap={0}
        borderRadius='full'
        overflow='hidden'
        position='relative'
        zIndex={2}
      >
        <Box
          bg='transparent'
          borderRadius='full'
          px='15px'
          py='9px'
          onClick={() => handleLanguageChange("EN")}
          cursor='pointer'
          w='50%'
          transition='all 0.2s ease'
          _hover={{
            bg: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <Text
            color='text'
            fontWeight='medium'
            fontSize='sm'
            fontFamily='body'
            position='relative'
            zIndex={3}
            textAlign='center'
          >
            EN
          </Text>
        </Box>

        <Box
          bg='transparent'
          borderRadius='full'
          px='15px'
          py='9px'
          onClick={() => handleLanguageChange("UA")}
          cursor='pointer'
          w='50%'
          transition='all 0.2s ease'
          _hover={{
            bg: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <Text
            color='text'
            fontWeight='medium'
            fontSize='sm'
            fontFamily='body'
            position='relative'
            zIndex={3}
            textAlign='center'
          >
            UA
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
