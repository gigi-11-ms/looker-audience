import React, { useContext } from "react";
import { Box, BoxProps, Header, Spinner } from "@looker/components";
import { DataProvider } from "@looker/components-data";
import {
  Query,
  QueryProps,
  Visualization,
  VisualizationProps,
} from "@looker/visualizations";
import { ComponentsProvider } from "@looker/components";
import { i18nInit as i18nInitVis, i18nResources } from "@looker/visualizations";
import { ExtensionContext } from "@looker/extension-sdk-react";

i18nInitVis();

interface VisualizationComponentProps {
  queryProps?: Partial<QueryProps>;
  visualizationProps?: Partial<VisualizationProps>;
  title?: string;
  boxProps?: BoxProps;
}

const LoadingIndicator = () => <Spinner size={50} />;

const VisualizationComponent = ({
  queryProps,
  visualizationProps,
  title,
  boxProps,
}: VisualizationComponentProps) => {
  const { core40SDK } = useContext(ExtensionContext);

  return (
    <DataProvider sdk={core40SDK}>
      <ComponentsProvider loadGoogleFonts resources={i18nResources}>
        <Box {...boxProps}>
          {title && (
            <Header paddingBottom="1.5rem" style={{ justifyContent: "center" }}>
              {title}
            </Header>
          )}
          <Query {...queryProps} LoadingIndicator={LoadingIndicator}>
            <Visualization {...visualizationProps} />
          </Query>
        </Box>
      </ComponentsProvider>
    </DataProvider>
  );
};
export default VisualizationComponent;
