import React from "react";

const useScroll = () => {
  const [isEndOfPage, setIsEndOfPage] = React.useState(false);
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    console.log(window.innerHeight, document.documentElement.scrollHeight);

    if (bottom) {
      setIsEndOfPage(true);
    } else {
      setIsEndOfPage(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isEndOfPage };
};

export default useScroll;
