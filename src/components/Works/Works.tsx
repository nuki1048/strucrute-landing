// CenterBurstGallery.tsx
import { Box } from "@chakra-ui/react";
import { BlurredBackground } from "../BlurredBackground/BlurredBackground";
import { CenterBurstGallery } from "./CenterBurstGallery";
import type { WorkItem } from "../../types/types";

import mockup1 from "../../assets/audiophile-promo.png";
import mockup2 from "../../assets/audophile-products.png";
import mockup3 from "../../assets/flowers-form.png";
import mockup4 from "../../assets/flowers-promo.png";
import mockup5 from "../../assets/guitarshop-promo.png";
import mockup6 from "../../assets/gitarshop-footer.png";
import mockup7 from "../../assets/furniro-promo.png";
import mockup8 from "../../assets/furniro-second.png";

export default function Works() {
  const items: WorkItem[] = [
    { title: "Item 1", image: mockup1 },
    { title: "Item 2", image: mockup2 },
    { title: "Item 3", image: mockup3 },
    { title: "Item 4", image: mockup4 },
    { title: "Item 5", image: mockup5 },
    { title: "Item 6", image: mockup6 },
    { title: "Item 7", image: mockup7 },
    { title: "Item 1", image: mockup1 },
    { title: "Item 2", image: mockup2 },
    { title: "Item 3", image: mockup3 },
    { title: "Item 4", image: mockup4 },
    { title: "Item 5", image: mockup5 },
    { title: "Item 6", image: mockup6 },
    { title: "Item 7", image: mockup7 },
    { title: "Item 1", image: mockup1 },
    { title: "Item 2", image: mockup2 },
    { title: "Item 3", image: mockup3 },
    { title: "Item 4", image: mockup4 },
    { title: "Item 5", image: mockup5 },
    { title: "Item 6", image: mockup6 },
    { title: "Item 7", image: mockup7 },
    { title: "Item 1", image: mockup1 },
    { title: "Item 2", image: mockup2 },
    { title: "Item 3", image: mockup3 },
    { title: "Item 4", image: mockup4 },
    { title: "Item 5", image: mockup5 },
    { title: "Item 6", image: mockup6 },
    { title: "Item 6", image: mockup6 },
    { title: "Item 6", image: mockup6 },
    { title: "Item 7", image: mockup7 },
    { title: "Item 8", image: mockup8 },
    { title: "Hero Custom", node: <BlurredBackground /> },
  ];

  return (
    <Box bg='#09090A' minH='100vh' color='white' id='projects'>
      <CenterBurstGallery items={items} />
    </Box>
  );
}
