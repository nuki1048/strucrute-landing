import { Box, Button, Text } from "@chakra-ui/react";
import { Button as ButtonComponent } from "../Button";
import { FormButton } from "./FormButton";

export const SecondStage = ({
  handlePreviousStage,
  handleSubmit,
  onClose,
  renderFormFields,
}: {
  handlePreviousStage: () => void;
  handleSubmit: () => void;
  onClose: () => void;
  renderFormFields: () => React.ReactNode;
}) => {
  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Text
          fontSize='clamp(1rem, 0.9573rem + 0.1553vw, 1.125rem)'
          color='white'
          fontWeight='600'
          textAlign='left'
          opacity={1}
        >
          Залиште коротку інформацію про себе, щоб ми могли зв'язатися з Вами:
        </Text>

        <Box display='flex' flexDirection='column' gap='25px'>
          {renderFormFields()}
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <Box
          width='100%'
          display='flex'
          gap='13px'
          alignItems='flex-end'
          justifyContent='space-between'
        >
          <Button
            bg='transparent'
            borderRadius='15px'
            width='40px'
            height='40px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            onClick={handlePreviousStage}
          >
            <Text color='white' fontSize='18px'>
              ←
            </Text>
          </Button>
          <ButtonComponent onClick={handleSubmit}>Відправити</ButtonComponent>
        </Box>

        <div style={{ display: "flex", gap: "13px", flexDirection: "column" }}>
          <FormButton onClose={onClose} />
        </div>
      </div>
    </>
  );
};
