import { Box, Image } from "@chakra-ui/react";
import mockup from "../assets/macbook-mockup.png";

export const MockupCarousel = () => {
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      paddingY='20px'
      w='100%'
      h='700px'
      marginTop='130px'
      gap='20px'
      overflow='hidden'
      paddingLeft='92px'
    >
      <Image
        src={mockup}
        alt='mockup'
        style={{
          width: "920px !important",
          height: "600px !important",
        }}
        borderRadius='35px'
      />
      <Image
        src={mockup}
        alt='mockup'
        style={{
          width: "920px !important",
          height: "600px !important",
        }}
        borderRadius='35px'
      />
    </Box>
  );
};
