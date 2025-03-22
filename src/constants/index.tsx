import { FC, SVGAttributes } from "react";
import CsvIcon from "../assets/csv.svg";

export const EMBED_PREFIX = {
  DASHBOARD: "embed_dashboard",
};

export const AUDIENCES_FOLDER_ID = "132";

export const INTEGRATION_HUB_ID = "1";

export const GOOGLE_DRIVE_INTEGRATION_ID = "1::google_drive";

export const MONITORING_DASHBOARD_ID = "173";

export const API_BASE_URL =
  "https://europe-west1-ms-gauss-pixel.cloudfunctions.net";
export const LOOKER_INTEGRATION = "looker-integration://";

export const GOOGLE_DRIVE_ACTION_DESTINATION =
  LOOKER_INTEGRATION + GOOGLE_DRIVE_INTEGRATION_ID;

export const Drive_Formats = [
  "txt",
  "csv",
  "inline_json",
  "json",
  "json_label",
  "json_detail",
  "json_detail_lite_stream",
  "json_bi",
  "xlsx",
  "html",
] as const;

type DriveFormatType = (typeof Drive_Formats)[number];

const FormatIconMap: Record<DriveFormatType, FC<SVGAttributes<SVGElement>>> = {
  csv: CsvIcon,
  html: CsvIcon,
  inline_json: CsvIcon,
  json: CsvIcon,
  json_bi: CsvIcon,
  json_detail: CsvIcon,
  json_detail_lite_stream: CsvIcon,
  json_label: CsvIcon,
  txt: CsvIcon,
  xlsx: CsvIcon,
};

export const getFormatIcon = (
  format: DriveFormatType
): FC<SVGAttributes<SVGElement>> => FormatIconMap[format] || CsvIcon;

export const AUDIENCES_API_TOKEN = "OtiSSjohDGigDqAFBCHQanVdptwbBqim3JABOtWM/B0=";

export const AUDIENCES_BASE_URL = "https://dia-audience-manager-948043638698.europe-southwest1.run.app"
