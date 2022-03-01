import { createTheme } from "@mui/material/styles";
const primaryColor = "#00151c";
const secondaryColor = "#e0002f";
const textColor = "#ffffff";
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    info: {
      main: textColor,
    },
    background: {
      default: primaryColor,
    },
    text: {
      primary: textColor,
    },
    typography: {
      allVariants: {
        color: textColor,
      },
    },
  },
});

theme.components = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        color: textColor,
      },
    },
  },
};

export default theme;
