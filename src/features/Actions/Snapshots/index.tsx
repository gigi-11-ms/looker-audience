import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useSnapshots from "../useSnapshots";
import {
  Button,
  Select,
  Space,
  SpaceVertical,
  Spinner,
} from "@looker/components";
import { FormOptionType } from "../../../components/FormSelect/FormSelect";
import SnapshotsTable from "./SnapshotsTable";
import useSnapshot from "../useSnapshot";
import useSaveSnapshot from "../useSaveSnapshot";
import { toast } from "react-toastify";
import queryClient from "../../../utils/queryClient";

const Snapshots = () => {
  const [snapshotId, setSnapshotId] = useState<string>();
  const { lookId } = useParams<{ lookId: string }>();
  const {
    data: snapshotsData,
    isLoading: isSnapshotsLoading,
    isError: isSnapshotsError,
  } = useSnapshots(lookId);
  const { data: snapshotData, isLoading: isSnapshotDataLoading } = useSnapshot(
    snapshotId,
    lookId
  );

  const { mutate: saveSnapshot, isLoading: isSnapshotSaveLoading } =
    useSaveSnapshot();

  useEffect(() => {
    if (isSnapshotsLoading) return;

    if (
      snapshotsData &&
      snapshotsData?.length > 0 &&
      snapshotsData[0].snapshot_id
    ) {
      setSnapshotId(snapshotsData[0].snapshot_id);
    }
  }, [snapshotsData, isSnapshotsLoading]);

  const snapshotSelectOptions = useMemo<FormOptionType[]>(
    () =>
      snapshotsData
        ?.filter(({ snapshot_id: snapshotId }) => !!snapshotId)
        ?.map(({ created_at: createdAt, snapshot_id: snapshotId }) => ({
          value: String(snapshotId),
          label: createdAt,
        })) || [],
    [snapshotsData]
  );

  const handleSaveSnapshot = useCallback((lookId: string) => {
    saveSnapshot(lookId, {
      onSuccess: () => {
        toast.success("Snapshot Created!");

        // Tempp
        queryClient.refetchQueries();
      },
    });
  }, []);

  return (
    <SpaceVertical gap="medium">
      <Space maxWidth={"30%"}>
        <Select
          value={snapshotId}
          onChange={(value: string) => {
            setSnapshotId(value);
          }}
          isLoading={isSnapshotsLoading}
          disabled={isSnapshotsError}
          options={snapshotSelectOptions}
          placeholder={"Select snapshot timestamp"}
        />
      </Space>
      <Button
        onClick={() => {
          handleSaveSnapshot(lookId);
        }}
      >
        create snapshot
      </Button>
      <Space
        justify="center"
        style={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}
      >
        <SnapshotsTable
          tableData={snapshotData || []}
          isLoading={isSnapshotDataLoading || isSnapshotsLoading}
        />
      </Space>
    </SpaceVertical>
  );
};

export default Snapshots;
