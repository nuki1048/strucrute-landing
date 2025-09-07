import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { system } from "../theme.ts";
import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "./components/Fonts.tsx";
import "./i18n"; // Import i18n configuration

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <Fonts />
      <App />
    </ChakraProvider>
  </StrictMode>
);
