import { FieldSelect, SelectOptionObject, Space } from "@looker/components";
import React, { FC, useEffect, useState } from "react";
import { hourRangeOptions, ScheduleComponentType } from "./Schedule";

const minuteLabelOptions: SelectOptionObject[] = Array.from(
  { length: 12 },
  (_, i) => {
    const value = (i * 5).toString();
    return { value, label: `${value} minutes` };
  }
);

const hourlyIntervalOptions: SelectOptionObject[] = [1, 2, 3, 4, 6, 8, 12].map(
  (value) => ({
    value: value.toString(),
    label: `Every ${value} hour${value > 1 ? "s" : ""}`,
  })
);

const HourlySection: FC<ScheduleComponentType> = ({ updateCron }) => {
  const [interval, setInterval] = useState("1");
  const [minute, setMinute] = useState("0");
  const [startHour, setStartHour] = useState("11");
  const [endHour, setEndHour] = useState("23");

  useEffect(() => {
    const cronExpr = `${minute} ${startHour}-${endHour}/${interval} * * *`;
    updateCron(cronExpr);
  }, [interval, minute, startHour, endHour, updateCron]);

  return (
    <Space>
      <FieldSelect
        label="Send Every"
        options={hourlyIntervalOptions}
        value={interval}
        onChange={setInterval}
      />
      <FieldSelect
        label="At (Minutes)"
        options={minuteLabelOptions}
        value={minute}
        onChange={setMinute}
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

export default HourlySection;
