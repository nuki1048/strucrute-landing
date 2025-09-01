import { Input as ChakraInput } from "@chakra-ui/react";

export const Input = ({
  placeholder,
  value,
  onChange,
  type,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}) => {
  return (
    <ChakraInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      bg='transparent'
      border='none'
      borderBottom='1px solid'
      borderColor='gray1'
      borderRadius='0px'
      color='white'
      _placeholder={{ color: "rgba(255, 255, 255, 0.6)" }}
      _focus={{
        bg: "rgba(255, 255, 255, 0.15)",
        boxShadow: "none",
        border: "none",
        borderBottom: "1px solid",
        borderColor: "white",
      }}
      _focusVisible={{
        outline: "none",
      }}
    />
  );
};
