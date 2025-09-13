import { Analytics } from "@vercel/analytics/react";
import { FormProvider } from "../contexts/FormContext";
import { StrictMode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../theme";
import Fonts from "./Fonts";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormProvider>
      <I18nextProvider i18n={i18n}>
        <ChakraProvider value={system}>
          <StrictMode>
            <Fonts />
            {children}
            <Analytics />
          </StrictMode>
        </ChakraProvider>
      </I18nextProvider>
    </FormProvider>
  );
};
