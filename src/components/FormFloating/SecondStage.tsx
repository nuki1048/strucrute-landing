import { Box, Button, Text, Link } from "@chakra-ui/react";
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
}: {
  handlePreviousStage: () => void;
  handleSubmit: () => void;
  onClose: () => void;
  renderFormFields: () => React.ReactNode;
  isSubmitting?: boolean;
  errors?: FormErrors;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
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

        <Box>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={"6Ld0asgrAAAAAKbSVMdtHWE8y3zN5dLkuc7Cdk7X"}
            size='invisible'
            onChange={() => {
              console.log("reCAPTCHA changed");
            }}
          />

          <Text fontSize='xs' color='gray5' textAlign='center' mt={2}>
            {t("form-floating.second-stage.recaptcha-text")}
            <Link
              href='https://policies.google.com/privacy'
              target='_blank'
              color='blue.400'
              textDecoration='underline'
            >
              {t("form-floating.second-stage.privacy-policy")}
            </Link>{" "}
            {t("form-floating.second-stage.recaptcha-text-1")}{" "}
            <Link
              href='https://policies.google.com/terms'
              target='_blank'
              color='blue.400'
              textDecoration='underline'
            >
              {t("form-floating.second-stage.terms-of-service")}
            </Link>{" "}
            {t("form-floating.second-stage.recaptcha-text-2")}
          </Text>
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
