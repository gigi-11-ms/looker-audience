import {
  CheckboxGroupOptionProps,
  FieldCheckboxGroup,
  FieldSelect,
  SelectOptionObject,
  Space,
  SpaceVertical,
} from "@looker/components";
import React, { FC, useEffect, useState } from "react";
import {
  hourOptions,
  minuteOptions,
  ScheduleComponentType,
  timeFormatOptions,
} from "./Schedule";

const monthCheckboxOptions: CheckboxGroupOptionProps[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((label, index) => ({ value: (index + 1).toString(), label }));

const monthDayOptions: SelectOptionObject[] = Array.from(
  { length: 31 },
  (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })
);

const MonthlySection: FC<ScheduleComponentType> = ({ updateCron }) => {
  const [monthType, setMonthType] = useState<"every" | "quarter" | "specific">(
    "every"
  );
  const [day, setDay] = useState("1");
  const [hour, setHour] = useState("1");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [months, setMonths] = useState<string[]>(
    Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  );

  useEffect(() => {
    const hour24 =
      ampm === "PM" ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12;
    let monthField = "*";

    if (monthType === "quarter") {
      monthField = "1,4,7,10";
    } else if (monthType === "specific") {
      monthField = months.join(",");
    }

    const cronExpr = `${minute} ${hour24} ${day} ${monthField} *`;
    updateCron(cronExpr);
  }, [monthType, day, hour, minute, ampm, months, updateCron]);

  return (
    <SpaceVertical>
      <Space>
        <FieldSelect
          label="Monthly Type"
          options={[
            { value: "every", label: "Every Month" },
            { value: "quarter", label: "Start of Each Quarter" },
            { value: "specific", label: "Specific Months" },
          ]}
          value={monthType}
          onChange={(val) => setMonthType(val as any)}
        />

        <FieldSelect
          label="Day"
          options={monthDayOptions}
          value={day}
          onChange={(val) => setDay(val)}
        />
        <FieldSelect
          label="Hour"
          options={hourOptions}
          value={hour}
          onChange={(val) => setHour(val)}
        />
        <FieldSelect
          label="Minute"
          options={minuteOptions}
          value={minute}
          onChange={(val) => setMinute(val)}
        />
        <FieldSelect
          label="AM/PM"
          options={timeFormatOptions}
          value={ampm}
          onChange={(val) => setAmpm(val as "AM" | "PM")}
        />
      </Space>
      {monthType === "specific" && (
        <FieldCheckboxGroup
          legend="Select Months"
          value={months}
          onChange={setMonths}
          options={monthCheckboxOptions}
          inputsInline
        />
      )}
    </SpaceVertical>
  );
};

export default MonthlySection;
