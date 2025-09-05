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
      paddingY={{ base: "15px", md: "36px" }}
      marginBottom='10px'
      justifyContent='flex-start'
      w='100%'
    >
      <Text
        fontSize='clamp(1.25rem, 0.6095rem + 2.3292vw, 3.125rem)'
        color='gray1'
        lineHeight={1}
        fontWeight={400}
        fontFamily='ppMori'
      >
        {number}
      </Text>
      <Text
        fontSize='clamp(1.125rem, 0.8688rem + 0.9317vw, 1.875rem)'
        color='white'
        lineHeight={1}
        fontWeight={400}
      >
        {title}
      </Text>
    </Box>
  );
};
