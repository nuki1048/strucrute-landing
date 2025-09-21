/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, Image } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useLayoutEffect, useCallback, useMemo } from "react";
import image from "../../assets/cloud-image.png?format=webp&as=src";

const MotionRow = motion.div;

const TextStrip = ({
  text,
  fontSize,
  fontWeight,
  letterSpacing,
  style,
}: {
  text: string;
  fontSize: any;
  fontWeight: any;
  letterSpacing: any;
  style: any;
}) => {
  return (
    <Text
      fontSize={fontSize}
      fontWeight={fontWeight}
      textTransform='uppercase'
      letterSpacing={letterSpacing}
      lineHeight={1}
      style={style}
      whiteSpace='nowrap'
      display='inline-block'
    >
      {text}
    </Text>
  );
};

export const BlurredBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Throttled resize handler
  const handleResize = useCallback(() => {
    if (firstRef.current) {
      setW(firstRef.current.scrollWidth);
    }
  }, []);

  // Measure width of one strip (one copy of the text)
  useLayoutEffect(() => {
    handleResize();

    // Throttled resize listener
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Memoized duration calculation
  const duration = useMemo(() => {
    return w > 0 ? w / 80 : 20;
  }, [w]);

  // Memoized text style to prevent recreation
  const textStyle = useMemo(
    () => ({
      background:
        "linear-gradient(90deg, #D9D9D9 0%, #70CBC3 29%, #C9C9C9 66%, #3741CA 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }),
    []
  );

  const text = "UI/UX DESIGN + WEB DEVELOPMENT + MOBILE APPS";

  // Only animate when in view
  const animationProps = isInView
    ? {
        animate: { x: [-w, 0] },
        transition: {
          duration,
          repeat: Infinity,
        },
      }
    : {
        animate: { x: 0 },
        transition: { duration: 0 },
      };

  return (
    <Box
      ref={containerRef}
      position='relative'
      w='100%'
      h='100vh'
      overflow='hidden'
      zIndex={1000}
    >
      {/* Optimized background with will-change */}
      <Box
        position='absolute'
        top='0'
        left='0'
        w='100%'
        h='100%'
        backgroundImage={`url(${image})`}
        backgroundSize='cover'
        backgroundPosition='center'
        filter='blur(5px)'
        opacity={0.3}
        zIndex={1}
        style={{
          willChange: "transform",
          transform: "translateZ(0)", // Force GPU acceleration
        }}
      />

      <Box
        position='absolute'
        top='50%'
        left='0'
        w='100%'
        transform='translateY(-50%)'
        zIndex={2}
      >
        <MotionRow
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            gap: "60px",
            willChange: "transform", // Optimize for animation
          }}
          {...animationProps}
        >
          {/* copy #1 (measured) */}
          <Box ref={firstRef as React.RefObject<HTMLDivElement>}>
            <TextStrip
              text={text}
              fontSize={{ base: "3xl", md: "6xl", lg: "200px" }} // Reduced from 250px
              fontWeight='300'
              letterSpacing='wider'
              style={textStyle}
            />
          </Box>

          {/* copy #2 */}
          <TextStrip
            text={text}
            fontSize={{ base: "3xl", md: "6xl", lg: "200px" }} // Reduced from 250px
            fontWeight='300'
            letterSpacing='wider'
            style={textStyle}
          />

          {/* copy #3 */}
          <TextStrip
            text={text}
            fontSize={{ base: "3xl", md: "6xl", lg: "200px" }} // Reduced from 250px
            fontWeight='300'
            letterSpacing='wider'
            style={textStyle}
          />
        </MotionRow>
      </Box>

      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: "15%",
          transform: "translateY(-50%)",
          zIndex: 3,
          willChange: "transform", // Optimize for animation
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
              }
            : {
                opacity: 0,
                scale: 0.8,
                y: 50,
              }
        }
        transition={{
          duration: 2,
          rotate: isInView
            ? {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined,
        }}
      >
        <Image
          src={image}
          alt='Billboard Mockup'
          maxW={{ base: "300px", md: "400px", lg: "500px" }}
          maxH={{ base: "200px", md: "300px", lg: "400px" }}
          objectFit='contain'
          boxShadow='0 20px 40px rgba(0,0,0,0.3)'
          loading='eager' // Preload this image too
        />
      </motion.div>
    </Box>
  );
};
