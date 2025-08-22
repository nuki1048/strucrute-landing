import { Box } from "@chakra-ui/react";
import { Card } from "./Card";

const cards = [
  {
    title: "КОЖЕН ВЕЛИКИЙ ПРОДУКТ ГОВОРИТЬ ВІЗУАЛЬНО",
    description: "ТАК НАРОДЖУЄТЬСЯ ДОВІРА",
    bg: "purple1",
    color: "white2",
  },
  {
    title: "МАЙБУТНІ ЛІДЕРИ НЕ КОПІЮЮТЬ",
    description: "ВОНА СТВОРЮЮТЬ ТРЕНДИ, ЯКІ НАСЛІДУЄ СВІТ",
    bg: "blue1",
    color: "white2",
  },
  {
    title: "ДИЗАЙН – ЦЕ ПОЧАТОК",
    description:
      "СПРАВЖНЯ ОСНОВА – ЦЕ КОД, ЩО ВИТРИМУЄ ЧАС І РОЗВИВАЄТЬСЯ ІЗ ТОБОЮ",
    bg: "gray2",
    color: "brown1",
  },
];

export const Cards = () => {
  return (
    <Box
      marginTop='180px'
      display='flex'
      gap='110px'
      flexDirection='column'
      paddingX='92px'
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          title={card.title}
          description={card.description}
          color={card.color}
          bg={card.bg}
        />
      ))}
    </Box>
  );
};
