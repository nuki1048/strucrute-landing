import { Box, Button, Text } from "@chakra-ui/react";
import { Button as ButtonComponent } from "../Button";
import { FormButton } from "./FormButton";
import ArrowLeftIcon from "../../assets/arrow-back.svg?react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

interface FormErrors {
  [key: string]: string;
}

export const SecondStage = ({
  handlePreviousStage,
  handleSubmit,
  onClose,
  renderFormFields,
  isSubmitting = false,
  errors = {},
  recaptchaRef,
  onRecaptchaChange,
}: {
  handlePreviousStage: () => void;
  handleSubmit: () => void;
  onClose: () => void;
  renderFormFields: () => React.ReactNode;
  isSubmitting?: boolean;
  errors?: FormErrors;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  onRecaptchaChange: (token: string | null) => void;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <form
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <Text
          fontSize='clamp(1rem, 0.9573rem + 0.1553vw, 1.125rem)'
          color='white'
          fontWeight='600'
          textAlign='left'
          opacity={1}
        >
          {t("form-floating.second-stage.description")}
        </Text>

        <Box display='flex' flexDirection='column' gap='25px'>
          {renderFormFields()}
        </Box>

        <Box height='80px'>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
          />
        </Box>

        {errors.submit && (
          <Text color='#ff6b6b' fontSize='sm'>
            {errors.submit}
          </Text>
        )}
      </form>

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
            disabled={isSubmitting}
          >
            <Text color='white' fontSize='18px'>
              <ArrowLeftIcon />
            </Text>
          </Button>
          <ButtonComponent onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? t("form-floating.second-stage.submitting")
              : t("form-floating.second-stage.submit")}
          </ButtonComponent>
        </Box>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "13px",
          }}
        >
          <FormButton onClose={onClose} />
        </div>
      </div>
    </>
  );
};
