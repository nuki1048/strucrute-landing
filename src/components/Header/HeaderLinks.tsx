import { Link } from "@chakra-ui/react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
export const HeaderLinks = () => {
  const { t } = useTranslation();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      posthog.capture("header-link-click", { link: id });
      element.scrollIntoView({ behavior: "smooth" });
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
