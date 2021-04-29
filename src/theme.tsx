export type Theme = {
  main: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    white: string;
    whiteBroken: string;
    dark: string;
    grayDarker: string;
    grayDark: string;
    gray: string;
    grayLight: string;
    grayLighter: string;
    error: string;
  };
};

const theme = (): Theme => ({
  main: {
    primary: '#56B5CB',
    primaryLight: '#81C6D6',
    primaryLighter: '#B3D9E2',
    white: '#fff',
    whiteBroken: '#F1F1F1',
    dark: '#111',
    grayDarker: '#424242',
    grayDark: '#757575',
    gray: '#A9A9A9',
    grayLight: '#CACACA',
    grayLighter: '#E9E8E8',
    error: '#E40000',
  },
});

export default theme;
