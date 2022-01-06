import { extendTheme, ThemeConfig } from "@chakra-ui/react";

export const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

export const chakraTheme = extendTheme({ config });
