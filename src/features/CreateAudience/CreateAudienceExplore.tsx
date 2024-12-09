import {
  Box,
  Button,
  LkFieldItem,
  LkFieldTree,
  Space,
  SpaceVertical,
  Span,
  Spinner,
  Tab2,
  Tabs2,
  TreeCollection,
} from "@looker/components";
import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useModelExplore from "./useExplore";
import { Dictionary } from "lodash";
import { ILookmlModelExploreField } from "@looker/sdk";
import VisualizationComponent from "./Visualization";
import useCreateQuery from "./useCreateQuery";
import Filters from "./Filters";

const categoryMap = new Map<string, string>([
  ["dimension", "DIMENSIONS"],
  ["measure", "MEASURES"],
]);

const categoryColorMap = new Map<string, string>([
  ["dimension", "#000"],
  ["measure", "#a66627"],
]);

const CreateAudienceExplore = () => {
  const { exploreName = "", modelName = "" } = useParams<{
    exploreName?: string;
    modelName?: string;
  }>();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [queryId, setQueryId] = useState<string>("");
  const { data, isLoading } = useModelExplore({ modelName, exploreName });
  const { mutate } = useCreateQuery();
  const { fields = {}, label } = data || {};

  // Maybe change this to recursive function
  const renderFieldsTree = useCallback(
    (
      fields: Dictionary<Dictionary<Dictionary<ILookmlModelExploreField[]>>>
    ) => {
      return Object.entries(fields).map(([key, value]) => (
        <LkFieldTree label={<strong>{key}</strong>} key={key} dividers>
          {Object.entries(value)?.map(([categoryKey, value]) => {
            const color = categoryColorMap.get(categoryKey);
            return (
              <Box marginTop={"1rem"} key={categoryKey}>
                <Span fontSize={"xsmall"} paddingLeft={"2.75rem"} color={color}>
                  {categoryMap.get(categoryKey)}
                </Span>
                {Object.entries(value).map(([key, nestedValue]) => {
                  if (key !== "other")
                    return (
                      <LkFieldTree
                        label={<strong>{key}</strong>}
                        key={key}
                        dividers
                      >
                        {nestedValue.map(({ label, name = "" }) => (
                          <LkFieldItem
                            style={{
                              cursor: "pointer",
                            }}
                            key={name}
                            color={color}
                            onClick={() =>
                              setSelectedFields((prev) => [...prev, name])
                            }
                          >
                            <Span
                              style={{
                                backgroundColor: selectedFields.includes(name)
                                  ? "rgb(234, 239, 245)"
                                  : "transparent",
                              }}
                            >
                              {label}
                            </Span>
                          </LkFieldItem>
                        ))}
                      </LkFieldTree>
                    );
                  return nestedValue.map(({ label, name = "" }) => (
                    <LkFieldItem
                      style={{
                        cursor: "pointer",
                      }}
                      key={name}
                      color={color}
                      onClick={() =>
                        setSelectedFields((prev) => [...prev, name])
                      }
                    >
                      <Span
                        style={{
                          backgroundColor: selectedFields.includes(name)
                            ? "rgb(234, 239, 245)"
                            : "transparent",
                        }}
                      >
                        {label}
                      </Span>
                    </LkFieldItem>
                  ));
                })}
              </Box>
            );
          })}
        </LkFieldTree>
      ));
    },
    [selectedFields]
  );

  const visualizationProps = useMemo(
    () => ({
      queryProps: {
        query: queryId,
      },
      visualizationProps: {
        height: window.innerHeight - 440,
      },
    }),

    [queryId]
  );

  return (
    <SpaceVertical height={"100%"}>
      <Space style={{ justifyContent: "space-between" }}>
        <Span fontSize={"xlarge"}>Explore</Span>
        <Button
          disabled={!selectedFields.length}
          onClick={() => {
            mutate(
              { exploreName, modelName, fields: selectedFields },
              {
                onSuccess: ({ client_id }) => {
                  setQueryId(client_id || "");
                },
              }
            );
          }}
        >
          Run Query
        </Button>
      </Space>
      <Space
        align="stretch"
        flex={1}
        style={{
          borderTop: "1px solid rgb(224, 224, 224)",
        }}
      >
        <Box
          maxHeight={"calc(100vh - 150px)"}
          overflowY={"auto"}
          flex={2}
          p={8}
          style={{
            borderRight: "1px solid rgb(224, 224, 224)",
          }}
        >
          <SpaceVertical>
            <Span fontSize={"xlarge"}>{label}</Span>
            <Tabs2>
              <Tab2 id="allFields" label="All Fields">
                {isLoading ? (
                  <Space around>
                    <Spinner />
                  </Space>
                ) : (
                  <TreeCollection>{renderFieldsTree(fields)}</TreeCollection>
                )}
              </Tab2>
              <Tab2 id="inUse" label="In Use ">
                <Span fontSize={"small"}>
                  No fields have been added to your query
                </Span>
              </Tab2>
            </Tabs2>
          </SpaceVertical>
        </Box>
        <Box flex={8} paddingTop={"1rem"}>
          {selectedFields.length ? (
            <SpaceVertical height={"100%"}>
              <SpaceVertical>
                <Span>Filters: </Span>
                <Filters />
              </SpaceVertical>
              {queryId ? (
                <SpaceVertical flex={1}>
                  <Span>Data:</Span>
                  <VisualizationComponent {...visualizationProps} />
                </SpaceVertical>
              ) : null}
            </SpaceVertical>
          ) : (
            <Span fontSize={"small"}>Quick Start</Span>
          )}
        </Box>
      </Space>
    </SpaceVertical>
  );
};

export default CreateAudienceExplore;
