import { Link } from "@chakra-ui/react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";

export const HeaderLinks = () => {
  const { t } = useTranslation();
  const { deviceType } = useCommonDeviceProps();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      track("scroll_to", { id, deviceType });
    }
  };

  return (
    <>
      <Link
        onClick={() => scrollTo("welcome")}
        fontSize='18px'
        color='text'
        transition='all 0.1s ease'
        _hover={{
          textDecoration: "none",
          color: "gray1",
        }}
      >
        {t("header.about")}
      </Link>
      <Link
        onClick={() => scrollTo("projects")}
        fontSize='18px'
        color='text'
        transition='all 0.1s ease'
        _hover={{
          textDecoration: "none",
          color: "gray1",
        }}
      >
        {t("header.projects")}
      </Link>
      <Link
        onClick={() => scrollTo("footer")}
        fontSize='18px'
        color='text'
        transition='all 0.1s ease'
        _hover={{
          textDecoration: "none",
          color: "gray1",
        }}
      >
        {t("header.consultation")}
      </Link>
      <LanguageSwitcher />
    </>
  );
};
