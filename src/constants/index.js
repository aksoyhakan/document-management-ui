export const getBreakPoint = (breakPoint) =>
  ({
    "3xs": 320,
    "2xs": 400,
    xs: 512,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    "3xl": 1600,
  }[breakPoint]);
