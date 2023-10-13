import 'styled-components';
import { Colors } from './globalStyle';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
  }
}
