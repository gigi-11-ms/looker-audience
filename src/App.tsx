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
  CREATE_AUDIENCE_PAGE,
  MONITORING_PAGE,
  SCHEDULED_TASKS_PAGE,
  TEMPLATES_PAGE,
} from "./routes/config";

// Pages
import Audiences from "./pages/Audiences";
import ErrorPage from "./pages/ErrorPage";
import Templates from "./pages/Templates";
import ScheduledTasks from "./pages/ScheduledTasks";
import Monitoring from "./pages/Monitoring";
import CreateAudiencePage from "./pages/CreateAudience";

// TODO: fix ts error for router
export const App = hot(() => {
  return (
    <ExtensionProvider>
      <QueryClientProvider client={queryClient}>
        <ComponentsProvider loadGoogleFonts resources={i18nResources}>
          <Router>
            <Layout>
              <Switch>
                <Route path="/" exact>
                  <Redirect to={AUDIENCES_PAGE} />
                </Route>
                <Route path={AUDIENCES_PAGE} exact component={Audiences} />
                <Route path={TEMPLATES_PAGE} exact component={Templates} />
                <Route
                  path={SCHEDULED_TASKS_PAGE}
                  exact
                  component={ScheduledTasks}
                />
                <Route path={MONITORING_PAGE} exact component={Monitoring} />
                <Route
                  path={CREATE_AUDIENCE_PAGE}
                  exact
                  component={CreateAudiencePage}
                />
                <Route component={ErrorPage} />
              </Switch>
            </Layout>
          </Router>
        </ComponentsProvider>
      </QueryClientProvider>
    </ExtensionProvider>
  );
});
