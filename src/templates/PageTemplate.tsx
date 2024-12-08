// @ts-nocheck Temp
import { SpaceVertical, SpaceVerticalProps, Box } from "@looker/components";
import React, { FC, PropsWithChildren } from "react";

const PageTemplate: FC<
  PropsWithChildren<{ centered?: boolean } & SpaceVerticalProps>
> = ({ children, centered = false, ...rest }) => (
  <SpaceVertical
    justify={centered ? "center" : "start"}
    p={16}
    backgroundColor={"#F6F8FA"}
    flex={1}
    {...rest}
  >
    <Box flex={1} width={"100%"}>
      {children}
    </Box>
  </SpaceVertical>
);

export default PageTemplate;
