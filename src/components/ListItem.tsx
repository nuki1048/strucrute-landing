import { Box, Text } from "@chakra-ui/react";

export const ListItem = ({
  title,
  number,
}: {
  title: string;
  number: string;
}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      gap='10px'
      borderBottom='1px solid'
      borderColor='gray3'
      paddingY='36px'
      marginBottom='10px'
      justifyContent='flex-start'
      w='100%'
    >
      <Text fontSize='50px' color='gray1' lineHeight={1} fontWeight={300}>
        {number}
      </Text>
      <Text fontSize='30px' color='white' lineHeight={1} fontWeight={500}>
        {title}
      </Text>
    </Box>
  );
};
