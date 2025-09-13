// CenterBurstGallery.tsx
import { Box } from "@chakra-ui/react";
import { BlurredBackground } from "../BlurredBackground/BlurredBackground";
import { CenterBurstGallery } from "./CenterBurstGallery";
import type { WorkItem } from "../../types/types";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import audiophilePromo from "../../assets/audiophile-promo.png?format=webp&as=src";
import audiophileProducts from "../../assets/audophile-products.png?format=webp&as=src";
import flowersForm from "../../assets/flowers-form.png?format=webp&as=src";
import flowersPromo from "../../assets/flowers-promo.png?format=webp&as=src";
import guitarshopPromo from "../../assets/guitarshop-promo.png?format=webp&as=src";
import guitarshopFooter from "../../assets/gitarshop-footer.png?format=webp&as=src";
import guitarshopChoose from "../../assets/guitarshop-choose.png?format=webp&as=src";
import furniroPromo from "../../assets/furniro-promo.png?format=webp&as=src";
import furniroSecond from "../../assets/furniro-second.png?format=webp&as=src";
import novaClinicPromo from "../../assets/nova-clinic-promo.png?format=webp&as=src";
import novaClinicImage from "../../assets/nova-clinic-image.png?format=webp&as=src";
import novaClinicNumbers from "../../assets/nova-clinic-numbers.png?format=webp&as=src";
import novaClinicOurAdvantages from "../../assets/nova-clinic-our-advantages.png?format=webp&as=src";
import novaClinicOurServices from "../../assets/nova-clinic-our-services.png?format=webp&as=src";
import novaClinicOurSpecialists from "../../assets/nova-clinic-specialists.png?format=webp&as=src";
import eCommerceChairsCart from "../../assets/e-commerce-chairs-cart.png?format=webp&as=src";
import eCommerceChairs from "../../assets/e-commerce-chairs.png?format=webp&as=src";
import eCommerceMobileRegister from "../../assets/e-commerce-mobile-register.png?format=webp&as=src";
import eCommerceMobileThree from "../../assets/e-commerce-mobile-three.png?format=webp&as=src";
import eCommerceProfile from "../../assets/e-commerce-profile.png?format=webp&as=src";
import studyhubCalendar from "../../assets/studyhub-calendar.png?format=webp&as=src";
import studyhubChat from "../../assets/studyhub-chat.png?format=webp&as=src";
import studyhubProfile from "../../assets/studyhub-profile.png?format=webp&as=src";
import studyhubRegister from "../../assets/studyhub-register.png?format=webp&as=src";
import studyhubSchedule from "../../assets/studyhub-schedule.png?format=webp&as=src";

export default function Works() {
  const commonProps = useCommonDeviceProps();

  useEffect(() => {
    track("view_works", { ...commonProps });
  }, [commonProps]);

  const items: WorkItem[] = [
    { title: "audiophilePromo", image: audiophilePromo },
    { title: "audiophileProducts", image: audiophileProducts },
    { title: "flowersForm", image: flowersForm },
    { title: "flowersPromo", image: flowersPromo },
    { title: "guitarshopPromo", image: guitarshopPromo },
    { title: "guitarshopFooter", image: guitarshopFooter },
    { title: "guitarshopChoose", image: guitarshopChoose },
    { title: "furniroPromo", image: furniroPromo },
    { title: "furniroSecond", image: furniroSecond },
    { title: "novaClinicPromo", image: novaClinicPromo },
    { title: "novaClinicImage", image: novaClinicImage },
    { title: "novaClinicNumbers", image: novaClinicNumbers },
    { title: "novaClinicOurAdvantages", image: novaClinicOurAdvantages },
    { title: "novaClinicOurServices", image: novaClinicOurServices },
    { title: "novaClinicOurSpecialists", image: novaClinicOurSpecialists },
    { title: "eCommerceChairsCart", image: eCommerceChairsCart },
    { title: "eCommerceChairs", image: eCommerceChairs },
    { title: "eCommerceMobileRegister", image: eCommerceMobileRegister },
    { title: "eCommerceMobileThree", image: eCommerceMobileThree },
    { title: "eCommerceProfile", image: eCommerceProfile },
    { title: "studyhubCalendar", image: studyhubCalendar },
    { title: "studyhubChat", image: studyhubChat },
    { title: "studyhubProfile", image: studyhubProfile },
    { title: "studyhubRegister", image: studyhubRegister },
    { title: "studyhubSchedule", image: studyhubSchedule },
    { title: "Hero Custom", node: <BlurredBackground /> },
  ];

  return (
    <Box bg='#09090A' minH='100vh' color='white' id='projects'>
      <CenterBurstGallery items={items} />
    </Box>
  );
}
