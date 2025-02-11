import {
  Button,
  ButtonTransparent,
  DialogLayout,
  Select,
  Space,
  SpaceVertical,
} from "@looker/components";
import React, { FC, useMemo, useState } from "react";
import {
  closeModal,
  openModal,
  useModalContext,
} from "../../../context/ModalContext";

import useSnapshots from "../useSnapshots";
import RunAction from "../RunAction";
import { FormOptionType } from "../../../components/FormSelect/FormSelect";

interface RunActionProps {
  lookId: string;
  title: string;
}

const ActionSnapshots: FC<RunActionProps> = ({ lookId, title }) => {
  const { dispatch } = useModalContext();
  const [queryId, setQueryId] = useState<string>();
  const {
    data: snapshotsData,
    isLoading: isSnapshotsLoading,
    isError: isSnapshotsError,
  } = useSnapshots(lookId);

  const snapshotSelectOptions = useMemo<FormOptionType[]>(
    () =>
      snapshotsData?.map(({ created_at: createdAt, query_id: queryId }) => ({
        value: String(queryId),
        label: createdAt,
      })) || [],
    [snapshotsData]
  );

  return (
    <DialogLayout
      header="Select snapshot to use or run action with latest data"
      footer={
        <Space gap="small">
          <Space gap="small">
            <Button
              onClick={() => {
                openModal(
                  dispatch,
                  <RunAction lookId={lookId} title={title} />
                );
              }}
            >
              Run With Latest Data
            </Button>
            <Button
              disabled={isSnapshotsLoading || !queryId}
              onClick={() => {
                openModal(
                  dispatch,
                  <RunAction lookId={lookId} queryId={queryId} title={title} />
                );
              }}
            >
              Run With Selected Snapshot Data
            </Button>
          </Space>
          <ButtonTransparent
            color="neutral"
            onClick={() => closeModal(dispatch)}
          >
            Close
          </ButtonTransparent>
        </Space>
      }
    >
      <SpaceVertical gap="small">
        <Select
          value={queryId}
          onChange={(value: string) => {
            setQueryId(value);
          }}
          isLoading={isSnapshotsLoading}
          disabled={isSnapshotsError}
          options={snapshotSelectOptions}
          placeholder={"Select snapshot"}
        />
      </SpaceVertical>
    </DialogLayout>
  );
};

export default ActionSnapshots;
