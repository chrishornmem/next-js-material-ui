import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00701a',
      light: '#76d275',
      dark: '#00701a',
    },
    secondary: {
      main: indigo['500'],
      light: '#757de8',
      dark: '#002984',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontFamilySecondary: "'Montserrat', sans-serif",
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  textTransform: 'uppercase',
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      fontWeight: rawTheme.typography.fontWeightBold,
      fontSize: "2rem",
      textTransform: 'initial',
    },
    h2: {
      ...rawTheme.typography.subtitle1,
      fontWeight: rawTheme.typography.fontWeightBold,
      fontSize: "2rem",
      lineHeight: 1.334,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
    },
    h4: {
      ...rawTheme.typography.h4,
      textTransform: 'uppercase',
      fontSize: '1.5rem',
      fontWeight: rawTheme.typography.fontWeightMedium,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      textTransform: 'uppercase',
      fontWeight: 600,
      fontFamily: rawTheme.typography.fontFamilySecondary,
      fontSize: '0.9rem',
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontWeight: rawTheme.typography.fontWeightBold,
      fontSize: "2rem",
      lineHeight: 1.334
    },
    subtitle2: {
      ...rawTheme.typography.subtitle1,
      fontWeight: rawTheme.typography.fontWeightBold,
      fontSize: "1.2rem",
      lineHeight: 1.334
    },
    body1: {
      ...rawTheme.typography.body1,
      fontWeight: rawTheme.typography.fontWeightLight,
      fontSize: "1.5rem",
    },
    body2: {
      ...rawTheme.typography.body2,
      fontSize: "1.25rem",
      fontWeight: rawTheme.typography.fontWeightBold,
    },
  },
};

export default theme;
