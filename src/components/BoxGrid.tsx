import { Box, type BoxProps } from "@chakra-ui/react";

export const BoxGrid = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      {...props}
      filter='blur(0px)'
      _hover={{
        filter: "blur(10px)",
        transition: "filter 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
};
