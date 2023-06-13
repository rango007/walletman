 import { createTheme } from '@mui/material/styles';
 import { errorColor, fontColor, fontDefault, fontTitle, primaryColor, secondaryColor, successColor, tertiaryColor } from './_variables.module.scss';
 
 export const theme = createTheme({
   palette: {
     primary: {
       main: primaryColor,
     },
     secondary: {
       main: secondaryColor,
     },
     tertiary: {
       main: tertiaryColor,
     },
     success: {
       main: successColor,
     },
     error: {
       main: errorColor,
     }
   },
   components: {
     MuiButton: {
       styleOverrides: {
         textSecondary: {
           color: fontColor
         }
       }
     },
     MuiIconButton: {
       styleOverrides: {
         root: {
          // Set the size of the IconButton based on the size of its icon/text
          size: ({ iconSize, textSize }) => `${Math.max(iconSize, textSize)}px`, 
         }
       }
     },
     MuiInputBase: {
       styleOverrides: {
         input: {
           fontFamily: fontDefault
         }
       }
     },
     MuiInputLabel: {
       styleOverrides: {
         root: {
           fontFamily: fontDefault
         }
       }
     },
     MuiToolbar: {
       styleOverrides: {
         root: {
           '@media (min-width: 600px)': {
             padding: 0
           }
         }
       }
     },
     MuiTypography: {
       styleOverrides: {
         root: {
           fontFamily: fontDefault
         },
         h1: {
           color: fontColor,
           fontSize: "84px",
           fontWeight: "400"
         },
         h2: {
           fontSize: "40px",
           fontWeight: "100",
           opacity: "60%"
         },
         h3: {
           fontFamily: fontTitle,
           fontSize: "24px"
         },
         h4: {
           color: fontColor,
           fontFamily: fontTitle,
           fontSize: "24px",
           fontWeight: "600"
         },
         h5: {
           color: fontColor,
           fontWeight: "200"
         },
         h6: {
           color: fontColor,
           fontWeight: "200",
           fontSize: "14px"
         }
       }
     }
   }
 });