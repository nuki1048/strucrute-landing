import { Button, Text } from "@chakra-ui/react";

export const FormFloating = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "285px",
        height: "60px",
        padding: "5px",
        backgroundColor: "rgba(31, 31, 31, 0.4)",
        backdropFilter: "blur(5px)",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      <Text
        fontFamily='ppMori'
        fontSize='16px'
        color='white'
        paddingLeft='20px'
      >
        Tell us about your needs
      </Text>
      <Button
        bg='#16161A'
        borderRadius='15px'
        width='50px'
        height='50px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        _hover={{ bg: "gray1", color: "white" }}
      >
        <Text fontFamily='ppMori' fontSize='16px' color='white'>
          =
        </Text>
      </Button>
    </div>
  );
};
