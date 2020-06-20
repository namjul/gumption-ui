import { defaultTokens } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

export const themeViolet = {
  ...defaultTokens,

  scales: {
    ...defaultTokens.scales,
    colors: {
      backgroundDark: '#323269',
      backgroundMedium: '#3c3c72',
      backgroundLight: '#444488',
      backgroundHighlight: '#5757a5',
      fontWhite: 'white',
      fontPrimary:'#424281',
      fontSecondary:'#7070b2',
      gray: [
        '#F8F9F9',
        '#EDEFF1',
        '#DDE0E4',
        '#CBD1D6',
        '#B2BAC2',
        '#939BA3', // base
        '#7A838C',
        '#636d75',
        '#515961',
        '#343b40',
      ],
    },
  },
} as const;


export const themeGreen = {
    ...defaultTokens,
  
    scales: {
      ...defaultTokens.scales,
      colors: {
        primary: '#006666',
        secondary: 'cyan',
        gray: [
          '#F8F9F9',
          '#EDEFF1',
          '#DDE0E4',
          '#CBD1D6',
          '#B2BAC2',
          '#939BA3', // base
          '#7A838C',
          '#636d75',
          '#515961',
          '#343b40',
        ],
      },
    },
  } as const;

export type Theme = typeof themeViolet;
