import { ExtensionContext } from "@looker/extension-sdk-react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { SDKRecord, Fields } from "@looker/visualizations-adapters";

export interface IQueryBuilderFields {
  breakdowns: IField[];
  periods: IField[];
  metrics: IField[];
}

export interface IField {
  label: string;
  name: string;
  key: string;
  id: string;
  type?: string;
  config?: {
    type: string;
    scope: number;
  };
  selected: boolean;
}

export interface IQueryResult {
  data: SDKRecord[];
  fields: Fields;
}

const useLookMlQuery = ({
  queryId,
  limit = 100,
}: {
  queryId: string;
  limit?: number;
}) => {
  const { core40SDK } = useContext(ExtensionContext);

  const { data, isLoading: isQuerySlugLoading } = useQuery({
    queryKey: ["useLookMlQuerySlug", queryId],
    queryFn: () => core40SDK.ok(core40SDK.query_for_slug(queryId)),
    enabled: !!queryId,
  });

  const { id = "" } = data || {};

  const result = useQuery({
    queryKey: ["useLookMlQuery", id],
    queryFn: () =>
      core40SDK.ok(
        core40SDK.run_query({
          query_id: id,
          result_format: "json_detail",
          limit: limit,
        })
      ),
    enabled: !!id,
  });

  return { ...result, isLoading: result.isLoading || isQuerySlugLoading };
};

export default useLookMlQuery;
