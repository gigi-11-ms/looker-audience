import {
  Button,
  ButtonTransparent,
  DialogLayout,
  Select,
  Space,
  SpaceVertical,
} from "@looker/components";
import React, { FC, useState } from "react";
import {
  closeModal,
  openModal,
  useModalContext,
} from "../../../context/ModalContext";

import useSnapshots from "../useSnapshots";
import useRunOneTimeAction from "../useRunOneTimeAction";
import useSaveSnapshot from "../useSaveSnapshot";
import RunAction from "../RunAction";
import useSnapshot from "../useSnapshot";

interface RunActionProps {
  lookId: string;
  title: string;
}

const ActionSnapshots: FC<RunActionProps> = ({ lookId, title }) => {
  const { dispatch } = useModalContext();
  const [snapshotId, setSnapshotId] = useState<string>();
  const { data, isLoading, isError } = useSnapshots(lookId);

  const { mutate: runOneTimeAction, isLoading: isActionRunLoading } =
    useRunOneTimeAction();
  const { mutate: saveSnapshot, isLoading: isSnapshotSaveLoading } =
    useSaveSnapshot();
  const { data: snapshotData, isLoading: snapshotLoading } =
    useSnapshot(snapshotId);

  const { queryId } = snapshotData || {};
  console.log(data, queryId);

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
              disabled={isLoading || snapshotLoading || !queryId}
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
          value={snapshotId}
          onChange={(value: string) => {
            setSnapshotId(value);
          }}
          disabled={isLoading || isError}
          options={[
            {
              value: "test",
              label: "Test",
            },
          ]}
          placeholder={"Select snapshot"}
        />
      </SpaceVertical>
    </DialogLayout>
  );
};

export default ActionSnapshots;
