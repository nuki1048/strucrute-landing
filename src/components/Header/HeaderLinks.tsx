import { Link } from "@chakra-ui/react";
import { LanguageSwitcher } from "../LanguageSwitcher";

export const HeaderLinks = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
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
        Про нас
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
        Проекти
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
        Консультація
      </Link>
      <LanguageSwitcher />
    </>
  );
};
