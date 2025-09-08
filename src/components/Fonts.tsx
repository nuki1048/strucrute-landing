import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* Raleway Font Family */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Thin.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 100;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-ThinItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-ExtraLight.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-ExtraLightItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Light.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 300;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-LightItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Regular.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Italic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Medium.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 500;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-MediumItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-SemiBold.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-SemiBoldItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Bold.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-BoldItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-ExtraBold.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 800;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-ExtraBoldItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-Black.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 900;
        font-display: swap;
        src: url('/src/assets/fonts/raleway/static/Raleway-BlackItalic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* PP Mori Font Family */
      @font-face {
        font-family: 'PP Mori';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url('/src/assets/fonts/pp-mori/PPMori-Extralight.otf') format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url('/src/assets/fonts/pp-mori/PPMori-ExtralightItalic.otf') format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/src/assets/fonts/pp-mori/PPMori-Regular.otf') format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('/src/assets/fonts/pp-mori/PPMori-RegularItalic.otf') format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/src/assets/fonts/pp-mori/PPMori-SemiBold.otf') format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url('/src/assets/fonts/pp-mori/PPMori-SemiBoldItalic.otf') format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* Noto Serif Font Family */
      @font-face {
        font-family: 'Noto Serif';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/src/assets/fonts/noto-serif/NotoSerifDisplay_Condensed-Regular.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Noto Serif';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('/src/assets/fonts/noto-serif/NotoSerifDisplay_Condensed-Italic.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}
  />
);

export default Fonts;
