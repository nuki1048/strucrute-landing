import { useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const useCommonDeviceProps = () => {
  const { i18n } = useTranslation();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  return {
    deviceType: isMobile ? "mobile" : "desktop",
    language: i18n.language,
  };
};
