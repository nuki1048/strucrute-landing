import { Textarea as ChakraTextarea } from "@chakra-ui/react";

export const Textarea = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <ChakraTextarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      bg='transparent'
      border='none'
      borderBottom='1px solid'
      borderColor='gray1'
      borderRadius='0px'
      color='white'
      height='100px'
      resize='none'
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
