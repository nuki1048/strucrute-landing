import { useState } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = ({
  onLanguageChange,
}: {
  onLanguageChange?: () => void;
}) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "uk">(
    i18n.language as "en" | "uk"
  );

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setCurrentLanguage(languageCode as "en" | "uk");
    onLanguageChange?.();
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
        left={currentLanguage === "en" ? "2px" : "50%"}
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
        height='100%'
        alignItems='center'
      >
        <Box
          bg='transparent'
          borderRadius='full'
          px='15px'
          py='9px'
          onClick={() => handleLanguageChange("en")}
          cursor='pointer'
          w='50%'
          h='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
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
            {t("languageSwitcher.en")}
          </Text>
        </Box>

        <Box
          bg='transparent'
          borderRadius='full'
          px='15px'
          py='9px'
          onClick={() => handleLanguageChange("uk")}
          cursor='pointer'
          w='50%'
          h='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
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
            {t("languageSwitcher.uk")}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
