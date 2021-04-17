type Theme = {
  main: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    whiteBroken: string;
    dark: string;
    darkLight: string;
    gray: string;
    grayLight: string;
    grayLighter: string;
  };
};

const theme = (): Theme => ({
  main: {
    primary: '#56B5CB',
    primaryLight: '#81C6D6',
    primaryLighter: '#B3D9E2',
    whiteBroken: '#F1F1F1',
    dark: '#111',
    darkLight: '#424242',
    gray: '#A9A9A9',
    grayLight: '#CACACA',
    grayLighter: '#E9E8E8',
  },
});

export default theme;
