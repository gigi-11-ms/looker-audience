import React from "react";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { hot } from "react-hot-loader/root";

import { HelloWorld } from "./HelloWorld";

export const App = hot(() => (
  <ExtensionProvider>
    <HelloWorld />
  </ExtensionProvider>
));
