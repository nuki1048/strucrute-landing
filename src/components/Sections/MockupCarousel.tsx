import { Box, Image } from "@chakra-ui/react";
import mockup from "../../assets/macbook-mockup.png?format=webp&as=src";
import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

export const MockupCarousel = () => {
  const commonProps = useCommonDeviceProps();
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    track("view_mockup_carousel", { ...commonProps });
  }, [commonProps]);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleTouchStart = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }, 2000);
  };

  return (
    <Box
      position='relative'
      w='100%'
      h={{ base: "240px", md: "700px" }}
      display='flex'
      flexDirection='column'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, FreeMode, Mousewheel]}
        spaceBetween={20}
        slidesPerView='auto'
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.1,
          momentumBounce: false,
        }}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: true,
        }}
        speed={6000}
        loop={true}
        allowTouchMove={true}
        grabCursor={true}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
        className='mockup-carousel-swiper'
      >
        {/* First set of mockups */}
        <SwiperSlide
          style={{
            width: "clamp(240px, 80vw, 920px)",
            flexShrink: 0,
          }}
        >
          <Image
            src={mockup}
            alt='mockup'
            w='100%'
            h={{ base: "180px", sm: "240px", md: "400px", lg: "600px" }}
            borderRadius={{ base: "20px", md: "35px" }}
            objectFit='cover'
          />
        </SwiperSlide>

        <SwiperSlide
          style={{
            width: "clamp(240px, 80vw, 920px)",
            flexShrink: 0,
          }}
        >
          <Image
            src={mockup}
            alt='mockup'
            w='100%'
            h={{ base: "180px", sm: "240px", md: "400px", lg: "600px" }}
            borderRadius={{ base: "20px", md: "35px" }}
            objectFit='cover'
          />
        </SwiperSlide>

        {/* Second set for seamless loop */}
        <SwiperSlide
          style={{
            width: "clamp(240px, 80vw, 920px)",
            flexShrink: 0,
          }}
        >
          <Image
            src={mockup}
            alt='mockup'
            w='100%'
            h={{ base: "180px", sm: "240px", md: "400px", lg: "600px" }}
            borderRadius={{ base: "20px", md: "35px" }}
            objectFit='cover'
          />
        </SwiperSlide>

        <SwiperSlide
          style={{
            width: "clamp(240px, 80vw, 920px)",
            flexShrink: 0,
          }}
        >
          <Image
            src={mockup}
            alt='mockup'
            w='100%'
            h={{ base: "180px", sm: "240px", md: "400px", lg: "600px" }}
            borderRadius={{ base: "20px", md: "35px" }}
            objectFit='cover'
          />
        </SwiperSlide>

        {/* Third set to ensure seamless loop */}
        <SwiperSlide
          style={{
            width: "clamp(240px, 80vw, 920px)",
            flexShrink: 0,
          }}
        >
          <Image
            src={mockup}
            alt='mockup'
            w='100%'
            h={{ base: "180px", sm: "240px", md: "400px", lg: "600px" }}
            borderRadius={{ base: "20px", md: "35px" }}
            objectFit='cover'
          />
        </SwiperSlide>

        <SwiperSlide
          style={{
            width: "clamp(240px, 80vw, 920px)",
            flexShrink: 0,
          }}
        >
          <Image
            src={mockup}
            alt='mockup'
            w='100%'
            h={{ base: "180px", sm: "240px", md: "400px", lg: "600px" }}
            borderRadius={{ base: "20px", md: "35px" }}
            objectFit='cover'
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};
