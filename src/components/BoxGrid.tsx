// components/BoxGrid.tsx
import React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

type Props = BoxProps & {
  hoverText?: string;
  hoverTextTop?: ResponsiveValue<string | number>;
  hoverTextBottom?: ResponsiveValue<string | number>;
  hoverTextLeft?: ResponsiveValue<string | number>;
  hoverTextRight?: ResponsiveValue<string | number>;
  hoverTextTransform?: ResponsiveValue<string>;
  hoverTextAlign?: ResponsiveValue<"left" | "right">;
  maxWHoverText?: ResponsiveValue<string | number>;
  hoverTextPadding?: ResponsiveValue<string | number>;
  mobileHoverNode?: React.ReactNode;
  isMobileActive?: boolean;
  disableBlurOnMobile?: boolean;
};

export const BoxGrid = React.forwardRef<HTMLDivElement, Props>(
  (
    {
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
      mobileHoverNode,
      isMobileActive,
      disableBlurOnMobile,
      borderRadius,
      ...props
    },
    ref
  ) => {
    // compute after-style visibility depending on isMobileActive
    const afterOpacity = isMobileActive ? 1 : 0;
    const afterVisibility = isMobileActive ? "visible" : "hidden";

    // blur styles applied to inner wrapper; disabled on mobile if requested
    const blurChildrenStyles =
      disableBlurOnMobile === true
        ? {}
        : {
            "& > .boxgrid-inner": {
              filter: "blur(20px)",
              transition: "filter 0.3s ease",
            },
          };

    return (
      <Box
        ref={ref}
        position='relative'
        cursor='pointer'
        // crucial: create clipping context so blurred pixels are hidden outside bounds
        borderRadius={borderRadius ?? "12px"}
        // apply blur styles on hover/active/pressed (for desktop), but only to the inner wrapper
        _active={{
          ...blurChildrenStyles,
          "&::after": {
            opacity: 1,
            visibility: "visible",
          },
        }}
        _hover={{
          ...blurChildrenStyles,
          "&::after": {
            opacity: 1,
            visibility: "visible",
          },
        }}
        _pressed={{
          ...blurChildrenStyles,
          "&::after": {
            opacity: 1,
            visibility: "visible",
          },
        }}
        width='fit-content'
        // pseudo-element keeps previous behaviour (desktop)
        _after={{
          content: `"${hoverText || ""}"`,
          position: "absolute",
          fontSize: "clamp(0.75rem, 0.6219rem + 0.4658vw, 1.125rem)",
          color: "white",
          zIndex: 100,
          maxW: maxWHoverText || "380px",
          lineHeight: 1.4,
          opacity: afterOpacity,
          visibility: afterVisibility,
          transition: "all 0.18s ease",
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
        {/* inner wrapper that will receive the blur, so blur gets clipped by overflow:hidden */}
        <Box className='boxgrid-inner' display='inline-block' width='100%'>
          {children}
        </Box>

        {/* optional mobile node (portal style node you might have used previously) */}
        {mobileHoverNode}
      </Box>
    );
  }
);

export default BoxGrid;
