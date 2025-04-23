import { FieldSelect } from "@looker/components";
import React, { FC, useEffect, useState } from "react";
import {
  hourOptions,
  minuteOptions,
  ScheduleComponentType,
  timeFormatOptions,
  weekdayOptions,
} from "./Schedule";

const WeeklySection: FC<ScheduleComponentType> = ({ updateCron }) => {
  const [weekday, setWeekday] = useState("1");
  const [hour, setHour] = useState("1");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    const hour24 =
      ampm === "PM" ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12;
    const cronExpr = `${minute} ${hour24} * * ${weekday}`;
    updateCron(cronExpr);
  }, [weekday, hour, minute, ampm, updateCron]);

  return (
    <>
      <FieldSelect
        label="Weekday"
        options={weekdayOptions}
        value={weekday}
        onChange={(val: string) => setWeekday(val)}
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
    </>
  );
};

export default WeeklySection;
