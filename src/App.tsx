import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";

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
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  useLenisSmoothScroll();
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      <LoadingScreen
        isVisible={showLoading}
        onComplete={handleLoadingComplete}
      />

      {showLoading ? null : (
        <Box bg='background' w='100%' paddingY={{ base: "28px", md: "15px" }}>
          <Global
            styles={`
    html, body { 
      overscroll-behavior-x: none; 
      overflow-x: clip; 
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */ 
      /* Mobile smooth scroll improvements */
      -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
      overscroll-behavior-y: none; /* Prevent bounce on mobile */
    }
    
    /* Lenis smooth scroll styles */
    html.lenis, html.lenis body {
      height: auto;
    }
    
    .lenis.lenis-smooth {
      scroll-behavior: auto !important;
    }
    
    .lenis.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }
    
    .lenis.lenis-stopped {
      overflow: hidden;
    }
    
    .lenis.lenis-smooth iframe {
      pointer-events: none;
    }
    
    #root { 
      overflow-x: clip;  
    }
    
    .bt-no-prepaint { 
      visibility: hidden !important; 
      opacity: 0 !important; 
    }
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
          <ScrollToTop />
        </Box>
      )}
    </>
  );
}

export default App;
