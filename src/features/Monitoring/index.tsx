import React from "react";
import EmbeddedDashboard from "../../components/EmbeddedDashboard";
import { MONITORING_DASHBOARD_ID } from "../../constants";

const Monitoring = () => (
  <EmbeddedDashboard dashboardId={MONITORING_DASHBOARD_ID} />
);

export default Monitoring;
