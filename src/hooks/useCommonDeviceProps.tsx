import { useMediaQuery } from "@chakra-ui/react";

export const useCommonDeviceProps = () => {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  return {
    deviceType: isMobile ? "mobile" : "desktop",
  };
};
