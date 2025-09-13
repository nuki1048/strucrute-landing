import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { thankYouVariants } from "./animations";
import CheckIcon from "../../assets/check.svg?react";

export const Final = () => {
  return (
    <motion.div
      variants={thankYouVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='20px'
        maxWidth='400px'
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            fontSize: "48px",
            color: "white",
          }}
        >
          <CheckIcon fill='white' width={64} height={64} />
        </motion.div>

        <Text
          fontSize='clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)'
          color='white'
          fontWeight='600'
          lineHeight='1.4'
        >
          Дякуємо за звернення!
        </Text>

        <Text
          fontSize='clamp(0.875rem, 0.8rem + 0.25vw, 1rem)'
          color='rgba(255, 255, 255, 0.8)'
          fontWeight='400'
          lineHeight='1.5'
        >
          Ми цінуємо ваш інтерес до наших послуг. Наші спеціалісти зв'яжуться з
          вами найближчим часом для обговорення деталей проекту.
        </Text>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          Форма закриється автоматично...
        </motion.div>
      </Box>
    </motion.div>
  );
};
