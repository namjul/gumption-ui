import { defaultTokens } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

export const themeViolet = {
  ...defaultTokens,

  scales: {
    ...defaultTokens.scales,
    colors: {
      backgroundDark: '#323269',
      backgroundMedium: '#3c3c72',
      backgroundLight: '#434386',
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
        backgroundDark: '#004c4c',
        backgroundMedium: '#006666',
        backgroundLight: '#007f7f',
        backgroundHighlight: '#009999',
        fontWhite: 'white',
        fontPrimary:'#006666',
        fontSecondary:'#009999',
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

  export const themeBlue = {
    ...defaultTokens,
  
    scales: {
      ...defaultTokens.scales,
      colors: {
        backgroundDark: '#097ca8',
        backgroundMedium: '#0ca0d8',
        backgroundLight: '#3ec1f3',
        backgroundHighlight: '#6ed0f6',
        fontWhite: 'white',
        fontPrimary:'#0eb2f0',
        fontSecondary:'#9ee0f9',
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

  export const themeGray = {
    ...defaultTokens,
  
    scales: {
      ...defaultTokens.scales,
      colors: {
        backgroundDark: '#343a40',
        backgroundMedium: '#484d53',
        backgroundLight: '#6c757d',
        backgroundHighlight: '#adb0b2',
        fontWhite: 'white',
        fontPrimary:'#999c9f',
        fontSecondary:'#d6d7d8',
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
