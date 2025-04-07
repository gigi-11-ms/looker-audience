// @ts-nocheck
import React, { lazy, Suspense } from "react";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { ComponentsProvider, i18nResources, Spinner } from "@looker/components";
import { hot } from "react-hot-loader/root";
import { HelloWorld } from "./pages/HelloWorld";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/queryClient";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Layout from "./layout";
import {
  AUDIENCES_PAGE,
  CREATE_AUDIENCE_EXPLORE_PAGE,
  CREATE_AUDIENCE_PAGE,
  MONITORING_PAGE,
  SCHEDULED_TASKS_PAGE,
  TEMPLATES_PAGE,
} from "./routes/config";

// Pages
import AudiencesPage from "./pages/Audiences";
import ErrorPage from "./pages/ErrorPage";
import TemplatesPage from "./pages/Templates";
import ScheduledTasksPage from "./pages/ScheduledTasks";
import MonitoringPage from "./pages/Monitoring";
import CreateAudiencePage from "./pages/CreateAudience";
import CreateAudienceExplorePage from "./pages/CreateAudienceExplore";
import ModalContextProvider from "./context/ModalContext";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

import "./index.css";

// TODO: fix ts error for router
export const App = hot(() => {
  return (
    <ExtensionProvider>
      <QueryClientProvider client={queryClient}>
        <ComponentsProvider loadGoogleFonts resources={i18nResources}>
          <ModalContextProvider>
            <ToastContainer />
            <Router>
              <Layout>
                <Switch>
                  <Route path="/" exact>
                    <Redirect to={AUDIENCES_PAGE} />
                  </Route>
                  <Route
                    path={AUDIENCES_PAGE}
                    exact
                    component={AudiencesPage}
                  />
                  <Route
                    path={TEMPLATES_PAGE}
                    exact
                    component={TemplatesPage}
                  />
                  <Route
                    path={SCHEDULED_TASKS_PAGE}
                    exact
                    component={ScheduledTasksPage}
                  />
                  <Route
                    path={MONITORING_PAGE}
                    exact
                    component={MonitoringPage}
                  />
                  <Route
                    path={CREATE_AUDIENCE_PAGE}
                    exact
                    component={CreateAudiencePage}
                  />
                  <Route
                    path={CREATE_AUDIENCE_EXPLORE_PAGE}
                    exact
                    component={CreateAudienceExplorePage}
                  />
                  <Route component={ErrorPage} />
                </Switch>
              </Layout>
            </Router>
          </ModalContextProvider>
        </ComponentsProvider>
      </QueryClientProvider>
    </ExtensionProvider>
  );
});
