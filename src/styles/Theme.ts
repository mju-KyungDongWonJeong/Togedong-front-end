import { DefaultTheme } from 'styled-components';

const colors = {
  WHITE: '#fff',
  ORANGE1: '#FF9B3F',
  ORANGE2: '#F7B487',
  GREEN: '#00BF08',
  GRAY1: '#6F6F6F',
  GRAY2: '#F3F5F9',
  BLACK: '#000',
};

export type Colors = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
