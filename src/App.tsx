import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header/Header";

import { AnyScreen } from "./components/AnyScreen/AnyScreen";
import { useLenisSmoothScroll } from "./hooks/useLenisSmoothScroll";
import Works from "./components/Works/Works";
import { Global } from "@emotion/react";
import {
  About,
  Footer,
  Info,
  MockupCarousel,
  Promo,
  Welcome,
} from "./components/Sections";
import { FormFloating } from "./components/FormFloating/FormFloating";
import { Cards } from "./components/Сards/Cards";

function App() {
  useLenisSmoothScroll();

  return (
    <Box bg='background' w='100%' paddingY={{ base: "28px", md: "15px" }}>
      <Global
        styles={`
  html, body { overscroll-behavior-x: none; overflow-x: clip; -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */ }
  #root { overflow-x: clip;  
 
  }
  .bt-no-prepaint { visibility: hidden !important; opacity: 0 !important; }

`}
      />
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
