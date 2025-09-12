import { useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "../Input";
import { FirstStage } from "./FirstStage";
import { SecondStage } from "./SecondStage";
import { Final } from "./Final";
import { expandedContentVariants } from "./animations";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";

interface ExpandedFormFloatingProps {
  onClose: () => void;
}

interface FormErrors {
  [key: string]: string;
}

export const ExpandedFormFloating = ({
  onClose,
}: ExpandedFormFloatingProps) => {
  const { t } = useTranslation();
  const formItems = [
    {
      title: t("form-floating.form-items.1"),
    },
    {
      title: t("form-floating.form-items.2"),
    },
    {
      title: t("form-floating.form-items.3"),
    },
  ];
  const formFields = [
    {
      id: "name",
      placeholder: t("form-floating.form-fields.name"),
      type: "text",
      required: true,
    },
    {
      id: "email",
      placeholder: t("form-floating.form-fields.email"),
      type: "email",
      required: true,
    },
    {
      id: "details",
      placeholder: t("form-floating.form-fields.details"),
      type: "textarea",
      required: false,
    },
  ];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const commonProps = useCommonDeviceProps();
  const initialFormData = formFields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (currentStage === 3) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentStage, onClose]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate required fields
    formFields.forEach((field) => {
      if (field.required && !formData[field.id].trim()) {
        newErrors[field.id] = t("form-floating.validation.required");
      }
    });

    // Validate email format
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = t("form-floating.validation.invalid-email");
    }

    // Validate name length
    if (formData.name && formData.name.trim().length < 2) {
      newErrors.name = t("form-floating.validation.name-too-short");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStage = () => {
    if (currentStage === 1 && selectedItems.length > 0) {
      setCurrentStage(2);
    }
  };

  const handlePreviousStage = () => {
    setCurrentStage((prev) => prev - 1);
    setErrors({}); // Clear errors when going back
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const sendToTelegramBot = async (data: {
    selectedItems: string[];
    formData: Record<string, string>;
  }) => {
    try {
      const response = await fetch(
        "https://structure-telegram-bot-production.up.railway.app/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedItems: data.selectedItems,
            formData: data.formData,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      track("form_floating_submit", {
        ...commonProps,
        selectedItems: selectedItems.join(","),
        formData: JSON.stringify(formData),
      });

      return await response.json();
    } catch (error) {
      console.error("Error sending to Telegram bot:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendToTelegramBot({ selectedItems, formData });
      setCurrentStage(3);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setErrors({ submit: t("form-floating.validation.submit-error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    return formFields.map((field) => (
      <div key={field.id}>
        <Input
          placeholder={field.placeholder}
          value={formData[field.id] || ""}
          onChange={(e) => handleInputChange(field.id, e.target.value)}
          type={field.type}
        />
        {errors[field.id] && (
          <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "4px" }}>
            {errors[field.id]}
          </div>
        )}
      </div>
    ));
  };

  return (
    <motion.div
      variants={expandedContentVariants}
      initial='hidden'
      animate='visible'
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "25px 20px" : "25px 35px",
      }}
    >
      {currentStage === 1 ? (
        <FirstStage
          formItems={formItems}
          handleNextStage={handleNextStage}
          onClose={onClose}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ) : currentStage === 2 ? (
        <SecondStage
          handlePreviousStage={handlePreviousStage}
          handleSubmit={handleSubmit}
          onClose={onClose}
          renderFormFields={renderFormFields}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      ) : (
        <Final />
      )}
    </motion.div>
  );
};
