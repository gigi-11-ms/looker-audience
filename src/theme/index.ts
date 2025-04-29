import { theme, Theme } from "@looker/components";

const defaultTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    key: "#C8030F",
    neutral: "#424242",
  },
};

export default defaultTheme
