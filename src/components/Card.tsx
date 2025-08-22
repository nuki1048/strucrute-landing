import { Box, Text, type BoxProps } from "@chakra-ui/react";
import { ArrowDown } from "./ArrowDown";

export const Card = ({
  title,
  description,
  bg,
  color,
  ...props
}: BoxProps & { title: string; description: string; color: string }) => {
  return (
    <Box
      width='100%'
      height='835px'
      borderRadius='30px'
      bg={bg}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      paddingX='50px'
      paddingY='80px'
      {...props}
    >
      <Text
        fontSize='90px'
        fontWeight='400'
        color={color}
        textAlign='center'
        lineHeight={1.2}
      >
        {title}
      </Text>
      <ArrowDown fill={color} />
      <Text
        fontSize='90px'
        fontWeight='400'
        color={color}
        textAlign='center'
        lineHeight={1.2}
      >
        {description}
      </Text>
    </Box>
  );
};
