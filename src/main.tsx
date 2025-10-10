import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Hotjar from "@hotjar/browser";
import { Providers } from "./components/Providers.tsx";
import "./swiper.css";

const siteId = 6517746;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

const initApp = () => {
  createRoot(document.getElementById("root")!).render(
    <Providers>
      <App />
    </Providers>
  );
};

if ("requestIdleCallback" in window) {
  requestIdleCallback(initApp, { timeout: 100 });
} else {
  setTimeout(initApp, 0);
}
