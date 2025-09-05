import { Box, Text } from "@chakra-ui/react";

export const Strip = ({
  items,
  gapPx,
  color = "gray1",
}: {
  items: string[];
  gapPx: number;
  color?: string;
}) => {
  return (
    <Box display='flex' gap={`${gapPx}px`} alignItems='center'>
      {items.map((item, idx) => (
        <Text
          key={`kw-${idx}`}
          fontSize='clamp(0.875rem, 0.5761rem + 1.087vw, 1.75rem)'
          color={color}
          lineHeight={1}
          fontWeight={400}
          flexShrink={0}
          opacity={0.8}
          cursor='pointer'
          _hover={{
            transform: "scale(1.1)",
            color: "white",
            transition: "0.2s",
          }}
        >
          {item}
        </Text>
      ))}
    </Box>
  );
};
