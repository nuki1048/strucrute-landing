import { type BoxProps, useToken } from "@chakra-ui/react";

export const ArrowDown = ({
  fill = "#D8C7AB",
}: BoxProps & { fill: string }) => {
  const color = useToken("colors", fill)[0];
  return (
    <svg width='24' height='113' viewBox='0 0 24 113' fill={color}>
      <path d='M10.9393 112.061C11.5251 112.646 12.4749 112.646 13.0607 112.061L22.6066 102.515C23.1924 101.929 23.1924 100.979 22.6066 100.393C22.0208 99.8076 21.0711 99.8076 20.4853 100.393L12 108.879L3.5147 100.393C2.92892 99.8076 1.97917 99.8076 1.39338 100.393C0.807595 100.979 0.807595 101.929 1.39338 102.515L10.9393 112.061ZM10.5 0V111H13.5V1.31134e-07L10.5 0Z' />
    </svg>
  );
};
