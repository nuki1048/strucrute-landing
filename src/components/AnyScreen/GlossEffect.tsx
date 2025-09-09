import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface GlossEffectProps {
  isActive: boolean;
}

export const GlossEffect = ({ isActive }: GlossEffectProps) => {
  return (
    <Box
      position='relative'
      overflow='hidden'
      borderRadius='20px'
      bg='linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      p='40px'
      minHeight='400px'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      {/* Main content */}
      <Box position='relative' zIndex={2} textAlign='center' color='white'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
            fontWeight='300'
            mb='20px'
            background='linear-gradient(90deg, #D9D9D9 0%, #70CBC3 29%, #C9C9C9 66%, #3741CA 100%)'
            backgroundClip='text'
            color='transparent'
            textTransform='uppercase'
            letterSpacing='wider'
          >
            Один продукт – будь-який екран
          </Box>
        </motion.div>
      </Box>

      {/* Gloss overlay */}
      <motion.div
        className='gloss-overlay'
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          transform: "skewX(-20deg)",
          zIndex: 1,
        }}
        animate={
          isActive
            ? {
                left: ["100%", "100%"],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3,
                },
              }
            : {
                left: "-100%",
              }
        }
        initial={{ left: "-100%" }}
      />

      {/* Additional shine effects */}
      <motion.div
        className='shine-effect'
        style={{
          position: "absolute",
          top: "20%",
          left: "-50%",
          width: "200%",
          height: "60%",
          background:
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          transform: "skewX(-15deg)",
          zIndex: 1,
        }}
        animate={
          isActive
            ? {
                left: ["150%", "150%"],
                transition: {
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 4,
                },
              }
            : {
                left: "-50%",
              }
        }
        initial={{ left: "-50%" }}
      />

      {/* Subtle background pattern */}
      <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        bottom='0'
        background='radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
        zIndex={0}
      />
    </Box>
  );
};
