// src/components/ui/Logo.tsx
'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className, width = 180, height = 60 }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 1800 600"
      width={width}
      height={height}
      className={cn('transition-colors duration-200', className)}
      aria-label="Solvejet Logo"
    >
      <title>Solvejet Logo</title>
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
          <path d="m0 0h1800v600h-1800z" />
        </clipPath>
      </defs>
      <g clipPath="url(#cp1)">
        <g>
          <g>
            {/* Text elements - will be white in dark mode */}
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m234.8 384.5q0-6-7.1-9.6-7-3.5-17.5-4.9-10.5-1.3-22.8-4.7-12.3-3.4-22.8-8.1-10.5-4.7-17.6-16.1-7.1-11.3-7.1-27.8 0-23.3 18.4-38.4c25.1-20.4 99.7-22.1 123.4-1.1l-15 36.8c-13.5-11.1-57.9-18.4-74.3-8.8q-6.9 4-6.9 11.1 0 7.1 10 11.2 10 4 24 6.7 14 2.7 28.2 7.1 14.2 4.4 24.1 15.4 10 11 10 28.2 0 27.7-19.6 42.6c-29.1 22-92.2 18-125.5-3.1l15.9-34.8c16.3 12.2 56.5 22.9 75 10.8q7.2-4.7 7.2-12.5z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m462.9 412.2q-27 26.1-66.5 26.1-39.5 0-66.5-26.1-27-26.2-27-63.4 0-37.1 27-63.3 27-26.2 66.5-26.2 39.5 0 66.5 26.2 27 26.2 27 63.3 0 37.2-27 63.4zm-66.5-20.8q18 0 30.5-12.3 12.5-12.4 12.5-30.3 0-17.2-12.5-29.7-12.5-12.5-30.5-12.5-18 0-30.5 12.5-12.6 12.5-12.6 29.7 0 17.9 12.4 30.3 12.3 12.3 30.7 12.3z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m518.7 187.4h50.7v245.9h-50.7z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m651.3 436.5l-71.3-175.3h55.4l44 114.6 44.2-114.6h55.1l-71.3 175.3z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m955.9 347.1q0 8.8-1.3 15.6h-122.7q10.5 35.1 46.3 35.1 7.7 0 14.8-1.1c5.6 8.3 8.2 20.4 6.1 38.4-7 1.1-20.5 3.2-28.3 3.2q-37.5 0-63.9-25.5-26.3-25.5-26.3-62.6 0-37.5 25.8-64.2 25.9-26.7 62.7-26.7 39.5 0 63.2 23.5 23.6 23.5 23.6 64.3zm-47.3-15.5q-3-14.5-13.3-23-10.3-8.4-26.2-8.4-14.2 0-24.8 8.3-10.7 8.2-14 23.1z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m1304.6 347.1q0 8.8-1.3 15.6h-122.6q10.4 35.1 46.2 35.1 27.1 0 47.7-13.5l16.8 30.4q-27 23.6-71.9 23.6-37.5 0-63.8-25.5-26.4-25.5-26.4-62.6 0-37.5 25.8-64.2 25.9-26.7 62.7-26.7 39.5 0 63.2 23.5 23.6 23.5 23.6 64.3zm-47.3-15.5q-3-14.5-13.3-23-10.3-8.4-26.2-8.4-14.2 0-24.8 8.3-10.7 8.2-14 23.1z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m1398.5 305.9v64.2q0 12.8 6.4 19.1 6.4 6.2 16.6 6.2 15.2 0 28.7-5v38.8q-17.6 7.5-46 7.5-56.4 0-56.4-59.5v-71.3h-32.1v-41.5h32.1v-48.5h50.7v48.5h51.7v41.5z"
            />

            {/* Dots pattern - blue elements */}
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1450.9 161.2c13 0 23.6 10.5 23.6 23.6 0 13-10.6 23.6-23.6 23.6-13.1 0-23.7-10.6-23.7-23.6 0-13.1 10.6-23.6 23.7-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1513.8 161.2c13 0 23.6 10.5 23.6 23.6 0 13-10.6 23.6-23.6 23.6-13.1 0-23.7-10.6-23.7-23.6 0-13.1 10.6-23.6 23.7-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1577 161.2c13.1 0 23.7 10.5 23.7 23.6 0 13-10.6 23.6-23.7 23.6-13 0-23.6-10.6-23.6-23.6 0-13.1 10.6-23.6 23.6-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1577 220.7c13.1 0 23.7 10.5 23.7 23.6 0 13-10.6 23.6-23.7 23.6-13 0-23.6-10.6-23.6-23.6 0-13.1 10.6-23.6 23.6-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1513.8 220.7c13 0 23.6 10.5 23.6 23.6 0 13-10.6 23.6-23.6 23.6-13.1 0-23.7-10.6-23.7-23.6 0-13.1 10.6-23.6 23.7-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1639.7 220.7c13.1 0 23.6 10.5 23.6 23.6 0 13-10.5 23.6-23.6 23.6-13 0-23.6-10.6-23.6-23.6 0-13.1 10.6-23.6 23.6-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1513.8 280.2c13 0 23.6 10.5 23.6 23.6 0 13-10.6 23.6-23.6 23.6-13.1 0-23.7-10.6-23.7-23.6 0-13.1 10.6-23.6 23.7-23.6z"
            />
            <path
              className="fill-[#186ebc] dark:fill-[#2196f3] transition-colors duration-200"
              d="m1513.8 339.7c13 0 23.6 10.6 23.6 23.6 0 13.1-10.6 23.6-23.6 23.6-13.1 0-23.7-10.5-23.7-23.6 0-13 10.6-23.6 23.7-23.6z"
            />
            <path
              className="fill-[#001926] dark:fill-white transition-colors duration-200"
              d="m1049 368.2v-170.1h55.4v163c0 90.6-119.5 95.4-158.6 45.9l28.4-28.1c11.7 18.2 74.8 31.2 74.8-10.7z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
