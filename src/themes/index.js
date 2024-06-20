import { createTheme } from '@mui/material/styles';
import typography from './typography';

const themes = () =>
  createTheme({
    palette: {
      primary: { main: '#E31837' },
      secondary: { main: '#C7C9D9' },
      // error: { main: '#E13232' },
      // warning: { main: '#FFB100' },
      // info: { main: '#8BC34A' },
      newColor: {
        lightGrey: '#4A4A4A',
        lightBlack: '#190134',
        redHover: '#FADFE3',
        selectValue: '#555770'
      },
    },
    typography: { ...typography },
  });

export default themes;
