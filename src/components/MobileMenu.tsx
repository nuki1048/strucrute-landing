import { Box, Button, Link } from "@chakra-ui/react";
import Logo from "../assets/logo.svg?react";
import CloseIcon from "../assets/close-icon.svg?react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "100%" }}
          exit={{ opacity: 0, y: -100, height: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: 1000,
            padding: "28px",
            background: "var(--chakra-colors-background)",
            overflow: "hidden",
          }}
        >
          {/* Header with Logo and Close Button */}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='flex-start'
            w='100%'
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Logo
                style={{
                  width: "70px",
                  height: "32px",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={onClose}
                bg='transparent'
                border='none'
                w='32px'
                h='32px'
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                transition='all 0.2s ease'
                p={0}
                m={0}
              >
                <CloseIcon style={{ width: "32px", height: "32px" }} />
              </Button>
            </motion.div>
          </Box>

          {/* Menu Items */}
          <Box
            display='flex'
            flexDirection='column'
            gap='30px'
            marginTop='100px'
            height='80%'
            w='100%'
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link
                href='#'
                fontSize='40px'
                textTransform='uppercase'
                color='text'
                transition='all 0.3s ease'
                _hover={{
                  textDecoration: "none",
                  color: "gray1",
                }}
                lineHeight='1.2'
                display='block'
                borderBottom='1px solid rgba(255, 255, 255, 0.1)'
              >
                Про нас
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                href='#'
                fontSize='40px'
                textTransform='uppercase'
                color='text'
                transition='all 0.3s ease'
                _hover={{
                  textDecoration: "none",
                  color: "gray1",
                }}
                lineHeight='1.2'
                display='block'
                borderBottom='1px solid rgba(255, 255, 255, 0.1)'
              >
                Проєкти
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link
                href='#'
                fontSize='40px'
                textTransform='uppercase'
                color='text'
                transition='all 0.3s ease'
                _hover={{
                  textDecoration: "none",
                  color: "gray1",
                }}
                lineHeight='1.2'
                display='block'
                borderBottom='1px solid rgba(255, 255, 255, 0.1)'
              >
                Консультація
              </Link>
            </motion.div>

            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                marginTop: "auto",
              }}
            >
              <LanguageSwitcher />
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
