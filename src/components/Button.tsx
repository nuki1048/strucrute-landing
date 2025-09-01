import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <ChakraButton
      onClick={onClick}
      disabled={disabled}
      width='103px'
      height='42px'
      backgroundColor='primary'
      borderRadius='10px'
      color='white'
      fontSize='16px'
      fontWeight='500'
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
      }}
    >
      {children}
    </ChakraButton>
  );
};
