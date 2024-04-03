export const colorTokens = (primitiveColors) => ({
  primary: {
    A: primitiveColors.gray["200"],
    B: primitiveColors.gray["900"],
    DEFAULT: "#FFFFFF",
    50: primitiveColors.gray["50"],
    100: primitiveColors.gray["100"],
    200: primitiveColors.gray["200"],
    300: primitiveColors.gray["300"],
    400: primitiveColors.gray["400"],
    500: primitiveColors.gray["500"],
    600: primitiveColors.gray["600"],
    700: primitiveColors.gray["700"],
  },

  accent: {
    DEFAULT: primitiveColors.blue["400"],
    50: primitiveColors.blue["50"],
    100: primitiveColors.blue["100"],
    200: primitiveColors.blue["200"],
    300: primitiveColors.blue["300"],
    400: primitiveColors.blue["400"],
    500: primitiveColors.blue["500"],
    600: primitiveColors.blue["600"],
    700: primitiveColors.blue["700"],
  },

  negative: {
    DEFAULT: primitiveColors.red["500"],
    50: primitiveColors.red["50"],
    100: primitiveColors.red["100"],
    200: primitiveColors.red["200"],
    300: primitiveColors.red["300"],
    400: primitiveColors.red["400"],
    500: primitiveColors.red["500"],
    600: primitiveColors.red["600"],
    700: primitiveColors.red["700"],
  },

  warning: {
    DEFAULT: primitiveColors.yellow["500"],
    50: primitiveColors.yellow["50"],
    100: primitiveColors.yellow["100"],
    200: primitiveColors.yellow["200"],
    300: primitiveColors.yellow["300"],
    400: primitiveColors.yellow["400"],
    500: primitiveColors.yellow["500"],
    600: primitiveColors.yellow["600"],
    700: primitiveColors.yellow["700"],
  },

  positive: {
    DEFAULT: primitiveColors.green["400"],
    50: primitiveColors.green["50"],
    100: primitiveColors.green["100"],
    200: primitiveColors.green["200"],
    300: primitiveColors.green["300"],
    400: primitiveColors.green["400"],
    500: primitiveColors.green["500"],
    600: primitiveColors.green["600"],
    700: primitiveColors.green["700"],
  },

  mono: {
    100: primitiveColors.gray["300"],
    200: primitiveColors.gray["400"],
    300: primitiveColors.gray["500"],
    400: primitiveColors.gray["600"],
    500: primitiveColors.gray["700"],
    600: "#292929",
    700: "#1F1F1F",
    800: "#141414",
    900: "#111111",
    1000: "#000000",
  },

  // Rating Palette,
  ratingInactiveFill: primitiveColors.gray["500"],
  ratingStroke: primitiveColors.gray["700"],
});

export { default as componentColors } from "baseui/themes/dark-theme/color-component-tokens";
export { default as semanticColors } from "baseui/themes/dark-theme/color-semantic-tokens";
