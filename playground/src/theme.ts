import base from '@gumption-ui/theme-base'; // eslint-disable-line import/no-extraneous-dependencies

export const themeViolet = {
  ...base,

  scales: {
    ...base.scales,
    colors: {
      backgroundDark: '#323269',
      backgroundMedium: '#3c3c72',
      backgroundLight: '#434386',
      backgroundHighlight: '#5757a5',
      fontWhite: 'white',
      fontPrimary: '#424281',
      fontSecondary: '#7070b2',
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
  ...base,

  scales: {
    ...base.scales,
    colors: {
      backgroundDark: '#004c4c', 
      backgroundMedium: '#006666',
      backgroundLight: '#007f7f',
      backgroundHighlight: '#197575',
      fontWhite: 'white',
      fontPrimary: '#006666',
      fontSecondary: '#009999',
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
  ...base,

  scales: {
    ...base.scales,
    colors: {
      backgroundDark: '#097ca8',
      backgroundMedium: '#2189b0',
      backgroundLight: '#52a3c2',
      backgroundHighlight: '#3a96b9',
      fontWhite: 'white',
      fontPrimary: '#0eb2f0',
      fontSecondary: '#9ee0f9',
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
  ...base,

  scales: {
    ...base.scales,
    colors: {
      backgroundDark: '#212735',
      backgroundMedium: '#293041',
      backgroundLight: '#2e3a4f',
      backgroundHighlight: '#333c51',
      fontWhite: 'white',
      fontPrimary: '#424d60',
      fontSecondary: '#576172',
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
