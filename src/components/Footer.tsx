import { Box, Button, Grid, Separator, Text } from "@chakra-ui/react";
import BehanceIcon from "../assets/behance-icon.svg?react";
import DribbleIcon from "../assets/dribble-icon.svg?react";
import LinkedinIcon from "../assets/linkedin-icon.svg?react";
export const Footer = () => {
  return (
    <Box
      width='100%'
      height='180px'
      paddingX='92px'
      paddingTop='25px'
      paddingBottom='15px'
    >
      <Separator borderColor='gray4' marginBottom='30px' borderWidth='1px' />
      <Grid
        width='100%'
        gridTemplateColumns='repeat(3, 1fr)'
        columnGap='10px'
        rowGap='30px'
        alignItems='center'
      >
        <Box display='flex' flexDirection='column' gap='10px'>
          <Text fontSize='22px' fontWeight='700' color='white' textAlign='left'>
            STRUCTURE
          </Text>
          <Text fontSize='16px' fontWeight='regular' color='gray1'>
            Digital products built fast, sharp, and ready to scale.
          </Text>
        </Box>
        <Text
          fontSize='14px'
          fontWeight='regular'
          color='gray1'
          textAlign='center'
          alignSelf='center'
          justifySelf='center'
        >
          © 2025 STRUCTURE. All rights reserved.
        </Text>
        <Box
          display='flex'
          flexDirection='column'
          gap='10px'
          alignItems='flex-end'
        >
          <Text fontSize='16px' fontWeight='regular' color='white'>
            agency@strctr.dev
          </Text>
          <Text fontSize='16px' fontWeight='regular' color='gray1'>
            Odesa · Remote Worldwide
          </Text>
          <Box display='flex' gap='20px'>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
            >
              <BehanceIcon />
            </Button>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
            >
              <DribbleIcon />
            </Button>
            <Button
              width='38px'
              height='38px'
              borderRadius='10px'
              bg='black1'
              border='1px solid'
              borderColor='gray4'
            >
              <LinkedinIcon />
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
