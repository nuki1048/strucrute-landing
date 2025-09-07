import { Box, Text } from "@chakra-ui/react";
import { FormListItem } from "./FormListItem";
import { Button as ButtonComponent } from "../Button";
import { FormButton } from "./FormButton";

export const FirstStage = ({
  formItems,
  handleNextStage,
  onClose,
  selectedItems,
  setSelectedItems,
}: {
  formItems: { title: string }[];
  handleNextStage: () => void;
  onClose: () => void;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}) => {
  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems={{ base: "center", md: "flex-start" }}
        gap='10px'
        flex='1'
      >
        <Text
          fontSize='clamp(1rem, 0.9573rem + 0.1553vw, 1.125rem)'
          color='white'
          fontWeight='600'
          textAlign='left'
          opacity={1}
          textWrap='nowrap'
        >
          Мені потрібно:
        </Text>
        <Text
          fontSize='12px'
          color='gray1'
          fontWeight='400'
          opacity={1}
          textAlign={{ base: "end", md: "inital" }}
        >
          Можете обрати декілька варіантів...
        </Text>
      </Box>
      <Box
        mt='25px'
        display='flex'
        flexDirection='column'
        gap='25px'
        width='100%'
        height='100%'
      >
        {formItems.map((item, index) => (
          <FormListItem
            key={index}
            number={`0${index + 1}`}
            title={item.title}
            isSelected={selectedItems.includes(item.title)}
            onClick={() => {
              const isSelected = selectedItems.includes(item.title);
              if (isSelected) {
                setSelectedItems(
                  selectedItems.filter(
                    (selectedItem: string) => selectedItem !== item.title
                  )
                );
              } else {
                setSelectedItems([...selectedItems, item.title]);
              }
            }}
          />
        ))}
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: "20px",
          gap: "13px",
          marginLeft: "auto",
          flexDirection: "column",
        }}
      >
        <ButtonComponent
          onClick={handleNextStage}
          disabled={selectedItems.length === 0}
        >
          Далі
        </ButtonComponent>
        <FormButton onClose={onClose} />
      </div>
    </>
  );
};
