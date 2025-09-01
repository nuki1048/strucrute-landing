import { useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "../Input";
import { FirstStage } from "./FirstStage";
import { SecondStage } from "./SecondStage";
import { Final } from "./Final";
import { expandedContentVariants } from "./animations";

const formItems = [
  {
    title: "UI/UX дизайн вебсайту/лендінгу/застосунку",
  },
  {
    title: "Розробка мобільного застосунку",
  },
  {
    title: "Розробка вебзастосунку/лендінгу",
  },
];

const formFields = [
  {
    id: "name",
    placeholder: "Ваше ім'я",
    type: "text",
    required: true,
  },
  {
    id: "email",
    placeholder: "Ваш e-mail",
    type: "email",
    required: true,
  },
  {
    id: "details",
    placeholder: "Розкажіть детальніше",
    type: "textarea",
    required: false,
  },
];

interface ExpandedFormFloatingProps {
  onClose: () => void;
}

export const ExpandedFormFloating = ({
  onClose,
}: ExpandedFormFloatingProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

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

  const handleNextStage = () => {
    if (currentStage === 1 && selectedItems.length > 0) {
      setCurrentStage(2);
    }
  };

  const handlePreviousStage = () => {
    setCurrentStage((prev) => prev - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", { selectedItems, formData });
    setCurrentStage(3);
  };

  const renderFormFields = () => {
    return formFields.map((field) => (
      <Input
        key={field.id}
        placeholder={field.placeholder}
        value={formData[field.id] || ""}
        onChange={(e) => handleInputChange(field.id, e.target.value)}
        type={field.type}
      />
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
        padding: isMobile ? "25px 30px" : "25px 35px",
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
        />
      ) : (
        <Final />
      )}
    </motion.div>
  );
};
