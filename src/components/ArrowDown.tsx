import { type BoxProps, useToken } from "@chakra-ui/react";

export const ArrowDown = ({
  fill = "#D8C7AB",
}: BoxProps & { fill: string }) => {
  const color = useToken("colors", fill)[0];
  return (
    <svg
      width='24'
      height='127'
      viewBox='0 0 24 127'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.9852 112.061C11.571 112.646 12.5208 112.646 13.1066 112.061L22.6525 102.515C23.2383 101.929 23.2383 100.979 22.6525 100.393C22.0667 99.8076 21.117 99.8076 20.5312 100.393L12.0459 108.879L3.56066 100.393C2.97488 99.8076 2.02513 99.8076 1.43934 100.393C0.853554 100.979 0.853554 101.929 1.43934 102.515L10.9852 112.061ZM10.5459 0V111H13.5459V1.31134e-07L10.5459 0Z'
        fill={color}
      />
    </svg>
  );
};
