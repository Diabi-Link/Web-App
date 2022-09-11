export type Theme = {
  main: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    white: string;
    whiteBroken: string;
    dark: string;
    darkLighter: string;
    grayDarker: string;
    grayDark: string;
    gray: string;
    grayLight: string;
    grayLighter: string;
    error: string;
    errorLight: string;
    errorLighter: string;
    success: string;
    successLighter: string;
    info: string;
    infoLighter: string;
    blueLight: string;
  };
};

const theme = (): Theme => ({
  main: {
    primary: '#56B5CB',
    primaryLight: '#81C6D6',
    primaryLighter: '#B3D9E2',
    white: '#fff',
    whiteBroken: '#FDFDFD',
    dark: '#111',
    darkLighter: 'rgba(0, 0, 0, 0.25)',
    grayDarker: '#424242',
    grayDark: '#757575',
    gray: '#A9A9A9',
    grayLight: '#CACACA',
    grayLighter: '#E9E8E8',
    error: '#E40000',
    errorLight: '#FD7676',
    errorLighter: '#FFA4A4',
    success: '#18DBA0',
    successLighter: '#88E4C9',
    info: '#E8D52D',
    infoLighter: '#F3E991',
    blueLight: '#C6E7E8',
  },
});

export default theme;
