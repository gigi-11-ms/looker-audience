import React, { FC, useEffect, useState } from "react";
import { FieldSelect, SelectOptionObject, Space } from "@looker/components";
import { hourRangeOptions, ScheduleComponentType } from "./Schedule";

const minuteIntervalOptions: SelectOptionObject[] = [5, 10, 15, 20, 30].map(
  (value) => ({
    value: value.toString(),
    label: `Every ${value} minutes`,
  })
);

const MinuteSection: FC<ScheduleComponentType> = ({ updateCron }) => {
  const [interval, setInterval] = useState("5");
  const [startHour, setStartHour] = useState("11");
  const [endHour, setEndHour] = useState("23");

  useEffect(() => {
    const cronExpr = `*/${interval} ${startHour}-${endHour} * * *`;
    updateCron(cronExpr);
  }, [interval, startHour, endHour, updateCron]);

  return (
    <Space>
      <FieldSelect
        label="Send Every"
        options={minuteIntervalOptions}
        value={interval}
        onChange={setInterval}
      />
      <FieldSelect
        label="Between (Start Hour)"
        options={hourRangeOptions}
        value={startHour}
        onChange={setStartHour}
      />
      <FieldSelect
        label="Between (End Hour)"
        options={hourRangeOptions}
        value={endHour}
        onChange={setEndHour}
      />
    </Space>
  );
};

export default MinuteSection;
