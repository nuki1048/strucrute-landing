/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
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

  // Measure width of one strip (one copy of the text)
  useLayoutEffect(() => {
    const measure = () => {
      if (firstRef.current) setW(firstRef.current.scrollWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Duration based on pixels to travel (for constant speed)
  const duration = w > 0 ? w / 80 : 20; // 80px per second speed

  const textStyle = {
    background:
      "linear-gradient(90deg, #D9D9D9 0%, #70CBC3 29%, #C9C9C9 66%, #3741CA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const text = "UI/UX DESIGN + WEB DEVELOPMENT + MOBILE APPS";

  return (
    <Box
      ref={containerRef}
      position='relative'
      w='100%'
      h='100vh'
      overflow='hidden'
      zIndex={1000}
    >
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
          }}
          animate={{ x: [-w, 0] }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* copy #1 (measured) */}
          <Box ref={firstRef as React.RefObject<HTMLDivElement>}>
            <TextStrip
              text={text}
              fontSize={{ base: "3xl", md: "6xl", lg: "250px" }}
              fontWeight='300'
              letterSpacing='wider'
              style={textStyle}
            />
          </Box>

          {/* copy #2 */}
          <TextStrip
            text={text}
            fontSize={{ base: "3xl", md: "6xl", lg: "250px" }}
            fontWeight='300'
            letterSpacing='wider'
            style={textStyle}
          />

          {/* copy #3 */}
          <TextStrip
            text={text}
            fontSize={{ base: "3xl", md: "6xl", lg: "250px" }}
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
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src={image}
          alt='Billboard Mockup'
          maxW={{ base: "300px", md: "400px", lg: "500px" }}
          maxH={{ base: "200px", md: "300px", lg: "400px" }}
          objectFit='contain'
          boxShadow='0 20px 40px rgba(0,0,0,0.3)'
          loading='lazy'
        />
      </motion.div>
    </Box>
  );
};
