import React, { FC } from "react";
import {
  Button,
  ProgressCircular,
  ButtonProps,
  Space,
  Spinner,
} from "@looker/components";

interface ILoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: FC<ILoadingButtonProps> = ({
  loading,
  children,
  ...rest
}) => (
  <Button loading {...rest}>
    {loading && <Spinner color="white" size={25} style={{ marginRight: "10px" }} />}
    {children}
  </Button>
);

export default LoadingButton;
