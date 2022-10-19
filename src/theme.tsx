export type Theme = {
  main: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    white: string;
    whiteDarker: string;
    whiteBroken: string;
    dark: string;
    darkLighter: string;
    darkBlue: string;
    darkGreen: string;
    darkRed: string;
    darkYellow: string;
    grayDarker: string;
    grayDark: string;
    gray: string;
    grayLight: string;
    grayLighter: string;
    red: string;
    redLighter: string;
    green: string;
    greenLighter: string;
    yellow: string;
    yellowLighter: string;
    blueLight: string;
  };
};

const theme = (): Theme => ({
  main: {
    primary: '#56B5CB',
    primaryLight: '#83C7D6',
    primaryLighter: '#9EDEED',
    white: '#fff',
    whiteDarker: '#ecfeff',
    whiteBroken: '#F1F1F1',
    dark: '#111',
    darkLighter: 'rgba(0, 0, 0, 0.25)',
    darkBlue: '#0F4C5A',
    darkGreen: '#047B57',
    darkRed: '#992424',
    darkYellow: '#4F3A04',
    grayDarker: '#424242',
    grayDark: '#757575',
    gray: '#A9A9A9',
    grayLight: '#CACACA',
    grayLighter: '#E9E8E8',
    red: '#F6404B',
    redLighter: '#FF9A9A',
    green: '#18DBA0',
    greenLighter: '#B5F9E4',
    yellow: '#E7D006',
    yellowLighter: '#FFE792',
    blueLight: '#CBE2E8',
  },
});

export default theme;
