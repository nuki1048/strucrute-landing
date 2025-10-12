import { Suspense } from "react";
import AnyScreenSVG from "../assets/any-screen.png";
import Phones from "../assets/any-screen-mobiles.png";
import Macbook from "../assets/mackbook.png";
import { Box, useMediaQuery } from "@chakra-ui/react";
export default function HeroVisual({
  isActive = false,
}: {
  isActive?: boolean;
}) {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box
        w='100%'
        h='100%'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        gap='20px'
      >
        {isMobile ? (
          <>
            <img
              src={Phones}
              className={`${isActive ? "active" : ""}`}
              loading='eager'
              style={{ height: "100%", width: "95%" }}
            />
            <img
              src={Macbook}
              className={`${isActive ? "active" : ""}`}
              loading='eager'
              style={{ height: "100%", width: "95%" }}
            />
          </>
        ) : (
          <>
            <img
              src={AnyScreenSVG}
              className={`${isActive ? "active" : ""}`}
              loading='eager'
              style={{ height: "700px" }}
            />
          </>
        )}
      </Box>
    </Suspense>
  );
}
