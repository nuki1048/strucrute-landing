import { Global } from "@emotion/react";

// Import fonts properly
import ralewayThin from "../assets/fonts/raleway/static/Raleway-Thin.ttf";
import ralewayThinItalic from "../assets/fonts/raleway/static/Raleway-ThinItalic.ttf";
import ralewayExtraLight from "../assets/fonts/raleway/static/Raleway-ExtraLight.ttf";
import ralewayExtraLightItalic from "../assets/fonts/raleway/static/Raleway-ExtraLightItalic.ttf";
import ralewayLight from "../assets/fonts/raleway/static/Raleway-Light.ttf";
import ralewayLightItalic from "../assets/fonts/raleway/static/Raleway-LightItalic.ttf";
import ralewayRegular from "../assets/fonts/raleway/static/Raleway-Regular.ttf";
import ralewayItalic from "../assets/fonts/raleway/static/Raleway-Italic.ttf";
import ralewayMedium from "../assets/fonts/raleway/static/Raleway-Medium.ttf";
import ralewayMediumItalic from "../assets/fonts/raleway/static/Raleway-MediumItalic.ttf";
import ralewaySemiBold from "../assets/fonts/raleway/static/Raleway-SemiBold.ttf";
import ralewaySemiBoldItalic from "../assets/fonts/raleway/static/Raleway-SemiBoldItalic.ttf";
import ralewayBold from "../assets/fonts/raleway/static/Raleway-Bold.ttf";
import ralewayBoldItalic from "../assets/fonts/raleway/static/Raleway-BoldItalic.ttf";
import ralewayExtraBold from "../assets/fonts/raleway/static/Raleway-ExtraBold.ttf";
import ralewayExtraBoldItalic from "../assets/fonts/raleway/static/Raleway-ExtraBoldItalic.ttf";
import ralewayBlack from "../assets/fonts/raleway/static/Raleway-Black.ttf";
import ralewayBlackItalic from "../assets/fonts/raleway/static/Raleway-BlackItalic.ttf";

import ppMoriExtraLight from "../assets/fonts/pp-mori/PPMori-Extralight.otf";
import ppMoriExtraLightItalic from "../assets/fonts/pp-mori/PPMori-ExtralightItalic.otf";
import ppMoriRegular from "../assets/fonts/pp-mori/PPMori-Regular.otf";
import ppMoriRegularItalic from "../assets/fonts/pp-mori/PPMori-RegularItalic.otf";
import ppMoriSemiBold from "../assets/fonts/pp-mori/PPMori-SemiBold.otf";
import ppMoriSemiBoldItalic from "../assets/fonts/pp-mori/PPMori-SemiBoldItalic.otf";

import notoSerifRegular from "../assets/fonts/noto-serif/NotoSerifDisplay_Condensed-Regular.ttf";
import notoSerifItalic from "../assets/fonts/noto-serif/NotoSerifDisplay_Condensed-Italic.ttf";

const Fonts = () => (
  <Global
    styles={`
      /* Raleway Font Family */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url(${ralewayThin}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 100;
        font-display: swap;
        src: url(${ralewayThinItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url(${ralewayExtraLight}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url(${ralewayExtraLightItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(${ralewayLight}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 300;
        font-display: swap;
        src: url(${ralewayLightItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${ralewayRegular}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url(${ralewayItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(${ralewayMedium}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 500;
        font-display: swap;
        src: url(${ralewayMediumItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(${ralewaySemiBold}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url(${ralewaySemiBoldItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(${ralewayBold}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url(${ralewayBoldItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url(${ralewayExtraBold}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 800;
        font-display: swap;
        src: url(${ralewayExtraBoldItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(${ralewayBlack}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 900;
        font-display: swap;
        src: url(${ralewayBlackItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* PP Mori Font Family */
      @font-face {
        font-family: 'PP Mori';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url(${ppMoriExtraLight}) format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url(${ppMoriExtraLightItalic}) format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${ppMoriRegular}) format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url(${ppMoriRegularItalic}) format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(${ppMoriSemiBold}) format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'PP Mori';
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url(${ppMoriSemiBoldItalic}) format('opentype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* Noto Serif Font Family */
      @font-face {
        font-family: 'Noto Serif';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${notoSerifRegular}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Noto Serif';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url(${notoSerifItalic}) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0400-04FF, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}
  />
);

export default Fonts;
