import { createLightTheme } from "baseui";

import { overrides, primitives } from "../base-config";
import { primitiveColors } from "../primitive-colors";
import { colorTokens, componentColors, semanticColors } from "./colors";

export const colors = {
  primitiveColors,
  semanticColors,
  componentColors,
  colorTokens: colorTokens(primitiveColors),
};

export const theme = createLightTheme(primitives, overrides);
