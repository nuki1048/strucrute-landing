import { Badge, Box, Text, useToken, type BoxProps } from "@chakra-ui/react";
import { ArrowDown } from "../ArrowDown";

export const Card = ({
  title,
  description,
  bg,
  color,
  badgeText,
  ...props
}: BoxProps & {
  title: string;
  description: string;
  color: string;
  badgeText: string;
}) => {
  const token = useToken("colors", color);
  return (
    <Box
      width='100%'
      borderRadius='30px'
      bg={bg}
      display='flex'
      flexDirection='column'
      alignItems='center'
      paddingX='50px'
      paddingY='30px'
      justifyContent='space-between'
      height={{ lg: "600px", base: "auto" }}
      boxShadow='0px 0px 10px 0px rgba(0, 0, 0, 0.1)'
      {...props}
    >
      <Badge
        marginRight='auto'
        variant='outline'
        color={color}
        borderRadius='20px'
        fontSize='12px'
        border={`1px solid ${token}`}
        paddingY='5px'
        paddingX='10px'
        size='lg'
      >
        {badgeText}
      </Badge>
      <Text
        fontSize='clamp(2.5rem, 1.646rem + 3.1056vw, 5rem)'
        fontWeight={"300"}
        color={color}
        lineHeight={1.2}
        fontFamily='raleway'
      >
        {title}
      </Text>
      <ArrowDown fill={color} />
      <Text
        fontSize='clamp(2.5rem, 1.646rem + 3.1056vw, 5rem)'
        fontWeight={"300"}
        color={color}
        textAlign='right'
        lineHeight={1.2}
        fontFamily='raleway'
      >
        {description}
      </Text>
    </Box>
  );
};
