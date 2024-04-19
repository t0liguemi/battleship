import { createTheme } from "@mui/material";

const themeOptions=createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f58d3e',
    },
    secondary: {
      main: '#03d8a1',
    },
    background: {
      default: '#252323',
    },
    divider: 'rgba(191,191,183,0.56)',
    warning: {
      main: '#ffc70f',
    },
  },
});
export default themeOptions