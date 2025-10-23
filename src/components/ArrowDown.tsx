import { type BoxProps, useToken } from "@chakra-ui/react";

export const ArrowDown = ({
  fill = "#D8C7AB",
  strokeWidth = 1.5,
}: BoxProps & { fill: string; strokeWidth?: number }) => {
  const color = useToken("colors", fill)[0];
  return (
    <svg
      width='24'
      height='113'
      viewBox='0 0 24 113'
      fill='none'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 0v100M6 94l6 6 6-6' />
    </svg>
  );
};
