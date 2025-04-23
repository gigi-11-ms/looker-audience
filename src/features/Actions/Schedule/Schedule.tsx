import React, { FC, useState } from "react";
import {
  Box,
  RadioGroup,
  SelectOptionObject,
  CheckboxGroupOptionProps,
  Space,
  SpaceVertical,
} from "@looker/components";
import { Controller, useFormContext } from "react-hook-form";
import DailySection from "./DailySection";
import WeeklySection from "./WeeklySection";
import MonthlySection from "./MonthlySection";
import MinuteSection from "./MinuteSection";
import HourlySection from "./HourlySection";

export const hourOptions: SelectOptionObject[] = Array.from(
  { length: 12 },
  (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })
);

export const minuteOptions: SelectOptionObject[] = Array.from(
  { length: 12 },
  (_, i) => {
    const value = (i * 5).toString().padStart(2, "0");
    return { value, label: value };
  }
);
export const hourRangeOptions: SelectOptionObject[] = Array.from(
  { length: 24 },
  (_, i) => {
    const hour24 = i;
    const labelHour = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const suffix = hour24 < 12 ? "AM" : "PM";
    return {
      value: hour24.toString(),
      label: `${labelHour}${suffix}`,
    };
  }
);

export const timeFormatOptions: SelectOptionObject[] = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

export const weekdayOptions: CheckboxGroupOptionProps[] = [
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
  { value: "0", label: "Sunday" },
];

type Frequency = "daily" | "weekly" | "monthly" | "hourly" | "minute";

type Props = {
  name: string;
};

const frequencyOptions = [
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "hourly",
    label: "Hourly",
  },
  {
    value: "minute",
    label: "By Minute",
  },
];

export type ScheduleComponentType = { updateCron: (cron: string) => void };
const scheduleMap: Record<Frequency, FC<ScheduleComponentType>> = {
  daily: DailySection,
  weekly: WeeklySection,
  monthly: MonthlySection,
  minute: MinuteSection,
  hourly: HourlySection,
};

export const SchedulePicker: FC<Props> = ({ name }) => {
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const { control } = useFormContext();

  return (
    <SpaceVertical gap="small">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => {
          const Component = scheduleMap[frequency];
          return (
            <>
              <RadioGroup
                name="frequency"
                value={frequency}
                onChange={(val) => setFrequency(val as Frequency)}
                options={frequencyOptions}
                inline
              />

              <Space gap="small">
                <Component updateCron={onChange} />
              </Space>
            </>
          );
        }}
      />
    </SpaceVertical>
  );
};
