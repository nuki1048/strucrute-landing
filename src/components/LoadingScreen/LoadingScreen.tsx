import { Box, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const LoadingScreen = ({
  isVisible,
  onComplete,
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isVisible) return;

    // Smoother progress simulation with better easing
    const startTime = Date.now();
    const duration = 3000; // 3 seconds total

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Apply easing function for smoother feel
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3); // easeOutCubic
      const finalProgress = easedProgress * 100;

      setProgress(finalProgress);

      if (finalProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Small delay at 100% for visual completion
        setTimeout(() => onComplete(), 300);
      }
    };

    // Start the animation
    requestAnimationFrame(updateProgress);
  }, [isVisible, onComplete]);

  // Calculate stroke-dasharray for circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090A",
          }}
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap='50px'
            maxW='400px'
            px='20px'
            minH='100vh'
            w='100%'
          >
            {/* Logo Animation with smoother entrance */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
                delay: 0.2,
              }}
            >
              <Text
                fontSize='4xl'
                fontWeight='bold'
                color='white'
                fontFamily='ppMori'
                textAlign='center'
                letterSpacing='0.05em'
              >
                STRUCTURE
              </Text>
            </motion.div>

            {/* Circular Progress Bar with smoother animation */}
            <Box
              position='relative'
              display='flex'
              alignItems='center'
              justifyContent='center'
              w='140px'
              h='140px'
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <svg
                  width='140'
                  height='140'
                  style={{ transform: "rotate(-90deg)" }}
                >
                  {/* Background circle */}
                  <circle
                    cx='70'
                    cy='70'
                    r={radius}
                    stroke='#2C2C2C'
                    strokeWidth='3'
                    fill='none'
                    opacity={0.3}
                  />
                  {/* Progress circle with single color */}
                  <motion.circle
                    cx='70'
                    cy='70'
                    r={radius}
                    stroke='#4843AE'
                    strokeWidth='3'
                    fill='none'
                    strokeLinecap='round'
                    strokeDasharray={strokeDasharray}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{
                      duration: 0.1,
                      ease: "linear",
                    }}
                  />
                </svg>
              </motion.div>

              {/* Percentage text with smooth counter animation */}
              <Box
                position='absolute'
                display='flex'
                alignItems='center'
                justifyContent='center'
                w='100%'
                h='100%'
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {t("loading.percentage", { count: Math.round(progress) })}
                </motion.div>
              </Box>
            </Box>

            {/* Loading Text with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            >
              <Text
                fontSize='sm'
                color='gray1'
                textAlign='center'
                fontFamily='body'
                letterSpacing='0.02em'
              >
                {t("loading.preparing")}
              </Text>
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
