import { ExtensionContext } from "@looker/extension-sdk-react";
import { groupBy, fromPairs } from "lodash";
import { useContext } from "react";
import { useQuery } from "react-query";

const useModelExplore = (params: {
  modelName: string;
  exploreName: string;
}) => {
  const { core40SDK } = useContext(ExtensionContext);
  const { exploreName, modelName } = params;
  return useQuery({
    queryKey: ["modelExplore", params],
    queryFn: () =>
      core40SDK.ok(core40SDK.lookml_model_explore(modelName, exploreName)),
    enabled: !!(exploreName && modelName),
    select: (data) => {
      const { fields: { dimensions = [], measures = [] } = {} } = data;

      const fieldDimensions = dimensions || [];
      const fieldMeasures = measures || [];
      const exploreFields = [...fieldDimensions, ...fieldMeasures];

      const fieldsGroupedByView = groupBy(
        exploreFields,
        ({ view_label }) => view_label || "other"
      );

      const fieldsGroupedByCategory = fromPairs(
        Object.entries(fieldsGroupedByView).map(([key, value]) => [
          key,
          groupBy(value, ({ category }) => category),
        ])
      );

      const fieldsGroupedByFieldGroup = fromPairs(
        Object.entries(fieldsGroupedByCategory).map(([key, value]) => {
          return [
            key,
            fromPairs(
              Object.entries(value).map(([key, value]) => [
                key,
                groupBy(
                  value,
                  ({ field_group_label }) => field_group_label || "other"
                ),
              ])
            ),
          ];
        })
      );

      return { ...data, fields: fieldsGroupedByFieldGroup };
    },
  });
};

export default useModelExplore;
