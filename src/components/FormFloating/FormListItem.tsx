import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CheckIcon from "../../assets/check.svg?react";
import {
  checkIconVariants,
  formListItemVariants,
  numberVariants,
} from "./animations";

export const FormListItem = ({
  number,
  title,
  isSelected,
  onClick,
}: {
  number: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      variants={formListItemVariants}
      initial='initial'
      animate='animate'
      whileHover='hover'
      whileTap='tap'
      onClick={onClick}
      style={{
        display: "flex",
        gap: "7px",
        cursor: "pointer",
        width: "100%",
        height: "39px",
        padding: "20px",
        borderBottom: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.1)",
        marginBottom: "2px",
      }}
    >
      {isSelected && (
        <motion.div
          variants={checkIconVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
          }}
        >
          <CheckIcon />
        </motion.div>
      )}

      {!isSelected && (
        <motion.div
          variants={numberVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          style={{
            width: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            fontSize='16px'
            color='gray1'
            fontFamily='ppMori'
            fontWeight='400'
            opacity={1}
          >
            {number}
          </Text>
        </motion.div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text
          fontSize='clamp(0.875rem, 0.8323rem + 0.1553vw, 1rem)'
          userSelect='none'
          fontWeight='500'
          color={isSelected ? "primary" : "white"}
          opacity={1}
        >
          {title}
        </Text>
      </div>
    </motion.div>
  );
};
