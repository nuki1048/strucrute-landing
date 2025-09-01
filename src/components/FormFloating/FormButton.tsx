import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import TwoLinesIcon from "../../assets/form-lines.svg?react";

export const FormButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <Button
      bg='#16161A'
      borderRadius='15px'
      width='40px'
      height='40px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      _hover={{ bg: "gray1", color: "white" }}
      onClick={onClose}
    >
      <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
        <TwoLinesIcon />
      </motion.div>
    </Button>
  );
};
