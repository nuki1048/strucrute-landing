import { Box, type BoxProps } from "@chakra-ui/react";

type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

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
  hoverTextPadding,
  ref,
  ...props
}: BoxProps & {
  hoverText?: string;
  hoverTextTop?: ResponsiveValue<string | number>;
  hoverTextBottom?: ResponsiveValue<string | number>;
  hoverTextLeft?: ResponsiveValue<string | number>;
  hoverTextRight?: ResponsiveValue<string | number>;
  hoverTextTransform?: ResponsiveValue<string>;
  hoverTextAlign?: ResponsiveValue<"left" | "right">;
  maxWHoverText?: ResponsiveValue<string | number>;
  hoverTextPadding?: ResponsiveValue<string | number>;
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Box
      ref={ref}
      position='relative'
      cursor='pointer'
      _active={{
        "& > *": {
          filter: "blur(20px)",
          transition: "filter 0.3s ease",
        },
        "&::after": {
          opacity: 1,
          visibility: "visible",
        },
      }}
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
      width='fit-content'
      _after={{
        content: `"${hoverText}"`,
        position: "absolute",
        fontSize: "clamp(0.75rem, 0.6219rem + 0.4658vw, 1.125rem)",
        color: "white",
        zIndex: 100,
        maxW: maxWHoverText || "380px",
        lineHeight: 1.4,
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.3s ease",
        textAlign: hoverTextAlign || "left",
        top: hoverTextTop || "50%",
        bottom: hoverTextBottom,
        left: hoverTextLeft || "auto",
        right: hoverTextRight || "auto",
        transform: hoverTextTransform || "translateY(-50%)",
        p: hoverTextPadding || "3",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
