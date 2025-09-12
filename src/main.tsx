import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { system } from "../theme.ts";
import Fonts from "./components/Fonts.tsx";
import i18n from "./i18n";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import Hotjar from "@hotjar/browser";
import { Analytics } from "@vercel/analytics/react";

const siteId = 6517746;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

const initApp = () => {
  createRoot(document.getElementById("root")!).render(
    <I18nextProvider i18n={i18n}>
      <ChakraProvider value={system}>
        <StrictMode>
          <Fonts />
          <App />
          <Analytics />
        </StrictMode>
      </ChakraProvider>
    </I18nextProvider>
  );
};

if ("requestIdleCallback" in window) {
  requestIdleCallback(initApp, { timeout: 100 });
} else {
  setTimeout(initApp, 0);
}
