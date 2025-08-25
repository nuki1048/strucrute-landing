import { Box, type BoxProps } from "@chakra-ui/react";

export const BoxGrid = ({
  children,
  hoverText,
  hoverTextTop,
  hoverTextBottom,
  hoverTextLeft,
  hoverTextRight,
  hoverTextTransform,
  hoverTextAlign,
  maxWHoverText,
  ...props
}: BoxProps & {
  hoverText?: string;
  hoverTextTop?: string | number;
  hoverTextBottom?: string | number;
  hoverTextLeft?: string | number;
  hoverTextRight?: string | number;
  hoverTextTransform?: string;
  hoverTextAlign?: "left" | "right";
  maxWHoverText?: string | number;
}) => {
  return (
    <Box
      {...props}
      position='relative'
      cursor='pointer'
      _hover={{
        "& > *": {
          filter: "blur(20px)",
          transition: "filter 0.3s ease",
        },
        "&::after": {
          opacity: 1,
          visibility: "visible",
        },
      }}
      _after={{
        content: `"${hoverText}"`,
        position: "absolute",
        fontSize: "16px",
        color: "white",
        zIndex: 100,
        maxW: maxWHoverText || "380px",
        lineHeight: 1.4,
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.3s ease",
        textAlign: hoverTextAlign,
        top: hoverTextTop || "50%",
        bottom: hoverTextBottom,
        left: hoverTextLeft || "auto",
        right: hoverTextRight || "auto",
        transform: hoverTextTransform || "translateY(-50%)",
        p: 3,
      }}
    >
      {children}
    </Box>
  );
};
