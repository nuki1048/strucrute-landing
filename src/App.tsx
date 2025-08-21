import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Promo } from "./components/Promo";
import { FormFloating } from "./components/FormFloating";
import { Welcome } from "./components/Welcome";

function App() {
  return (
    <Box
      bg='background'
      w='100%'
      paddingLeft='92px'
      paddingRight='92px'
      paddingY='15px'
    >
      <Header />
      <Promo />
      <Welcome />
      <FormFloating />
    </Box>
  );
}

export default App;
