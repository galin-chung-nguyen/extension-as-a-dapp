import type { Config } from 'tailwindcss/types/config';
import { nextui } from '@nextui-org/react';

export default {
  // content: [
  //   // ...
  //   // make sure it's pointing to the ROOT node_module
  //   './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  // ],
  darkMode: 'class',
  /** shared plugins configuration */
  plugins: [nextui()],
  /** shared theme configuration */
  theme: {
    // set primary color to 115D5D
    extend: {
      colors: {
        primary: '#115D5D',
      },
      backgroundColor: {
        primary: '#115D5D',
      },
    },
  },
} as Omit<Config, 'content'>;
