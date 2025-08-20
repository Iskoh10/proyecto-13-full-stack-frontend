import { Icon } from '@chakra-ui/react';

export const CartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='48'
      height='48'
      viewBox='0 0 48 48'
    >
      <g fill='none'>
        <path
          fill='#fabc3d'
          d='M24 47.998c13.255 0 24-10.745 24-24C48 10.746 37.255 0 24 0S0 10.745 0 23.999s10.745 23.999 24 23.999'
        />
        <path
          fill='#059bbf'
          d='M24.436 10.036a13.9 13.9 0 0 0-8.906 3.207c-5.394 4.475-4.621 9.132-4.621 10.756h11.345l8.549-12.432a13.9 13.9 0 0 0-6.367-1.531'
        />
        <path
          fill='#21b2d1'
          d='M24.436 10.036a13.9 13.9 0 0 0-8.906 3.207c-5.394 4.475-4.621 9.132-4.621 10.756h2.355L26.993 10.27a14 14 0 0 0-2.557-.234'
        />
        <path fill='#0484ab' d='M10.91 23.999h21.6l-3.41 8.726H15.736z' />
        <path
          fill='#21b2d1'
          d='M22.255 10.206v13.792L15.53 13.242a13.9 13.9 0 0 1 6.725-3.036M10.909 23.999h11.345L11.44 18.866c-.78 2.3-.531 4.208-.531 5.133'
        />
        <path fill='#40c9e7' d='M32.507 23.999h-22.47l.436 1.745h21.348z' />
        <path
          fill='#fff'
          d='M29.673 34.47H15.927a.873.873 0 0 1 0-1.745h13.151l4.583-11.664a.87.87 0 0 1 .812-.553h2.618a.873.873 0 0 1 0 1.745h-2.023l-4.583 11.664a.87.87 0 0 1-.812.554'
        />
        <path
          fill='#3e3e3f'
          d='M18.764 37.962a2.618 2.618 0 1 0 0-5.237a2.618 2.618 0 0 0 0 5.236'
        />
        <path
          fill='#fff'
          d='M18.764 36.216a.873.873 0 1 0 0-1.745a.873.873 0 0 0 0 1.745'
        />
        <path
          fill='#3e3e3f'
          d='M28.364 37.962a2.618 2.618 0 1 0 0-5.237a2.618 2.618 0 0 0 0 5.236'
        />
        <path
          fill='#fff'
          d='M28.364 36.216a.873.873 0 1 0 0-1.745a.873.873 0 0 0 0 1.745'
        />
        <path
          fill='#40c9e7'
          d='M11.44 18.866c-.78 2.3-.531 4.208-.531 5.133h2.355l2.894-2.894zm10.815-8.66a13.87 13.87 0 0 0-6.725 3.037l3.267 5.223l3.458-3.458z'
        />
        <path fill='#6fdaf1' d='m10.037 23.999l.436 1.745h1.046l1.745-1.745z' />
      </g>
    </svg>
  );
};

export const AddToCartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='48'
      height='48'
      viewBox='0 0 48 48'
    >
      <defs>
        <mask id='SVG1op3pbsl'>
          <g fill='none'>
            <path fill='#fff' d='M39 32H13L8 12h36z' />
            <path
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='4'
              d='M3 6h3.5L8 12m0 0l5 20h26l5-20z'
            />
            <circle
              cx='13'
              cy='39'
              r='3'
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='4'
            />
            <circle
              cx='39'
              cy='39'
              r='3'
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='4'
            />
            <path
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='4'
              d='M22 22h8m-4 4v-8'
            />
          </g>
        </mask>
      </defs>
      <path fill='currentColor' d='M0 0h48v48H0z' mask='url(#SVG1op3pbsl)' />
    </svg>
  );
};

export const RemoveFromCartIcon = (props) => (
  <Icon viewBox='0 0 48 48' {...props}>
    <defs>
      <mask id='SVGWNCDKewo'>
        <g fill='none'>
          <path fill='#fff' d='M39 32H13L8 12h36z' />
          <path
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='4'
            d='M3 6h3.5L8 12m0 0l5 20h26l5-20z'
          />
          <circle
            cx='13'
            cy='39'
            r='3'
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='4'
          />
          <circle
            cx='39'
            cy='39'
            r='3'
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='4'
          />
          <path
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='4'
            d='M22 22h8'
          />
        </g>
      </mask>
    </defs>
    <path fill='currentColor' d='M0 0h48v48H0z' mask='url(#SVGWNCDKewo)' />
  </Icon>
);

export const ClearCartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
    >
      <g fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M5.219 2.75H4.2a.75.75 0 0 1 0-1.5h1.603a.75.75 0 0 1 .727.566l1.502 5.937a2 2 0 0 1 .974-.253h7.989a2.012 2.012 0 0 1 1.955 2.468l-.783 3.461A2.01 2.01 0 0 1 16.21 15H9.79a2.01 2.01 0 0 1-1.956-1.57L7.05 9.967a2 2 0 0 1-.027-.145a1 1 0 0 1-.05-.14zM9.25 18.5a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5m7 0a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5'
          clipRule='evenodd'
          opacity='0.2'
        />
        <path d='M3.712 2.5H2.5a.5.5 0 0 1 0-1h1.603a.5.5 0 0 1 .485.379l1.897 7.6a.5.5 0 0 1-.97.242z' />
        <path
          fillRule='evenodd'
          d='M15.495 7.5h-7.99q-.226 0-.447.05A2.02 2.02 0 0 0 5.55 9.969l.783 3.461A2.01 2.01 0 0 0 8.29 15h6.422a2.01 2.01 0 0 0 1.956-1.57l.783-3.462q.05-.221.05-.449A2.01 2.01 0 0 0 15.496 7.5M7.283 8.525a1 1 0 0 1 .223-.025h7.989a1.013 1.013 0 0 1 .98 1.247l-.784 3.462a1.01 1.01 0 0 1-.98.791H8.29c-.468 0-.875-.328-.98-.791l-.783-3.462a1.02 1.02 0 0 1 .757-1.222'
          clipRule='evenodd'
        />
        <path d='M17 16.75a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0m-7 0a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0' />
        <path d='M1.15 1.878a.514.514 0 0 1 .728-.727l16.971 16.971a.514.514 0 0 1-.727.727z' />
      </g>
    </svg>
  );
};

export const BuyCartIcon = (props) => (
  <Icon viewBox='0 0 48 48' {...props}>
    <g fill='none' strokeWidth='4'>
      <path
        fill='#2fff4b'
        fillRule='evenodd'
        stroke='#000'
        strokeLinejoin='round'
        d='M6 15H42L40 42H8L6 15Z'
        clipRule='evenodd'
      />
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16 19V6H32V19'
      />
      <path stroke='#fff' strokeinecap='round' d='M16 34H32' />
    </g>
  </Icon>
);
