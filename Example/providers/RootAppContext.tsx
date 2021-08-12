import React, { useContext } from "react";

import { Theme } from "@material-ui/core";

import { IMicroServiceData } from "@core/core/types";

import DefaultTheme from "../theme";

export interface IRootAppContext {
  theme: Theme;
  data: IMicroServiceData;
}

export const INITIAL_MICROSERVICE_DATA: IMicroServiceData = {
  sidebarLogo: <div />,
  sidebarAppsList: [],
};

export const RootAppContext = React.createContext<IRootAppContext>({
  theme: DefaultTheme,
  data: INITIAL_MICROSERVICE_DATA,
});

export function useRootAppContext() {
  return useContext(RootAppContext);
}
