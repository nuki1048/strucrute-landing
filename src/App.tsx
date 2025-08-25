import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Promo } from "./components/Promo";
import { FormFloating } from "./components/FormFloating";
import { Welcome } from "./components/Welcome";
import { Info } from "./components/Info";
import { About } from "./components/About";
import { MockupCarousel } from "./components/MockupCarousel";
import { Cards } from "./components/Cards";
import { Works } from "./components/Works";
import { AnyScreen } from "./components/AnyScreen";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Box
      bg='background'
      w='100%'
      paddingY='15px'
      overflow='hidden'
      scrollBehavior='smooth'
    >
      <Header />
      <Promo />
      <Welcome />
      <Info />
      <About />
      <MockupCarousel />
      <Cards />
      <Works />
      <AnyScreen />
      <FormFloating />
      <Footer />
    </Box>
  );
}

export default App;
