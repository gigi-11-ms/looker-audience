import {
  FieldCheckboxGroup,
  FieldSelect,
  Space,
  SpaceVertical,
} from "@looker/components";
import React, { FC, useEffect, useState } from "react";
import {
  hourOptions,
  minuteOptions,
  ScheduleComponentType,
  timeFormatOptions,
  weekdayOptions,
} from "./Schedule";

type DailyType = "weekdays" | "everyday" | "specific";

const DailySection: FC<ScheduleComponentType> = ({ updateCron }) => {
  const [dailyType, setDailyType] = useState<DailyType>("weekdays");
  const [hour, setHour] = useState("1");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [days, setDays] = useState<string[]>(["1", "2", "3", "4", "5"]);

  useEffect(() => {
    const hour24 =
      ampm === "PM" ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12;
    let cronDays = "*";

    if (dailyType === "weekdays") cronDays = "1-5";
    else if (dailyType === "specific") cronDays = days.join(",");

    const cronExpr = `${minute} ${hour24} * * ${cronDays}`;
    updateCron(cronExpr);
  }, [dailyType, hour, minute, ampm, days, updateCron]);

  return (
    <SpaceVertical gap="small">
      <Space gap="small">
        <FieldSelect
          label="Daily Type"
          options={[
            { value: "weekdays", label: "Weekdays" },
            { value: "everyday", label: "Everyday" },
            { value: "specific", label: "Specific Days" },
          ]}
          value={dailyType}
          onChange={(val: DailyType) => setDailyType(val)}
        />

        <FieldSelect
          label="Hour"
          options={hourOptions}
          value={hour}
          onChange={(val: string) => setHour(val)}
        />
        <FieldSelect
          label="Minute"
          options={minuteOptions}
          value={minute}
          onChange={(val: string) => setMinute(val)}
        />
        <FieldSelect
          label="AM/PM"
          options={timeFormatOptions}
          value={ampm}
          onChange={(val: string) => setAmpm(val as "AM" | "PM")}
        />
      </Space>
      {dailyType === "specific" && (
        <FieldCheckboxGroup
          legend="Select Days"
          value={days}
          onChange={setDays}
          options={weekdayOptions}
          inputsInline
        />
      )}
    </SpaceVertical>
  );
};

export default DailySection;
