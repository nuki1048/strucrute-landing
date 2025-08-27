import { Link } from "@chakra-ui/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const HeaderLinks = () => {
  return (
    <>
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
    </>
  );
};
