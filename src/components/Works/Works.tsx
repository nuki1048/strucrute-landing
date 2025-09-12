// CenterBurstGallery.tsx
import { Box } from "@chakra-ui/react";
import { BlurredBackground } from "../BlurredBackground/BlurredBackground";
import { CenterBurstGallery } from "./CenterBurstGallery";
import type { WorkItem } from "../../types/types";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import mockup1 from "../../assets/audiophile-promo.png?format=webp&as=src";
import mockup2 from "../../assets/audophile-products.png?format=webp&as=src";
import mockup3 from "../../assets/flowers-form.png?format=webp&as=src";
import mockup4 from "../../assets/flowers-promo.png?format=webp&as=src";
import mockup5 from "../../assets/guitarshop-promo.png?format=webp&as=src";
import mockup6 from "../../assets/gitarshop-footer.png?format=webp&as=src";
import mockup7 from "../../assets/furniro-promo.png?format=webp&as=src";
import mockup8 from "../../assets/furniro-second.png?format=webp&as=src";

export default function Works() {
  const commonProps = useCommonDeviceProps();

  useEffect(() => {
    track("view_works", { ...commonProps });
  }, [commonProps]);

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
