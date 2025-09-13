import React, { createContext, useState, useEffect } from "react";

interface FormContextType {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  currentStage: number;
  setCurrentStage: (stage: number) => void;
  formData: Record<string, string>;
  setFormData: (data: Record<string, string>) => void;
  clearForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("form-selected-items");
      const savedStage = localStorage.getItem("form-current-stage");
      const savedData = localStorage.getItem("form-data");

      if (savedItems) setSelectedItems(JSON.parse(savedItems));
      if (savedStage) setCurrentStage(parseInt(savedStage));
      if (savedData) setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "form-selected-items",
        JSON.stringify(selectedItems)
      );
    }
  }, [selectedItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("form-current-stage", currentStage.toString());
    }
  }, [currentStage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("form-data", JSON.stringify(formData));
    }
  }, [formData]);

  const clearForm = () => {
    setSelectedItems([]);
    setCurrentStage(1);
    setFormData({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("form-selected-items");
      localStorage.removeItem("form-current-stage");
      localStorage.removeItem("form-data");
    }
  };

  return (
    <FormContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        currentStage,
        setCurrentStage,
        formData,
        setFormData,
        clearForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext }; // Export the context itself
