import React, { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  ListItem,
  NavList,
  Button,
  Box,
  Span,
  SpaceVertical,
} from "@looker/components";
import { NavItemType } from "./types";
import {
  AUDIENCES_PAGE,
  CREATE_AUDIENCE_PAGE,
  MONITORING_PAGE,
  SCHEDULED_TASKS_PAGE,
  TEMPLATES_PAGE,
} from "../../routes/config";

const NavigationElements: NavItemType[] = [
  {
    name: "My Audiences",
    path: AUDIENCES_PAGE,
  },
  {
    name: "Templates",
    path: TEMPLATES_PAGE,
  },
  {
    name: "Schedulet Tasks",
    path: SCHEDULED_TASKS_PAGE,
  },
  {
    name: "Monitoring",
    path: MONITORING_PAGE,
  },
];

const Navigation = () => {
  const history = useHistory();
  const location = useLocation();
  const handleMenuItemClick = useCallback(
    (path: string) => history.push(path),
    []
  );

  return (
    <SpaceVertical>
      <Button
        fullWidth
        size={"large"}
        onClick={() => history.push(CREATE_AUDIENCE_PAGE)}
      >
        Create New Audience
      </Button>
      <Box width={"100%"}>
        <NavList>
          {NavigationElements.map(({ name, path }) => (
            <ListItem
              onClick={() => handleMenuItemClick(path)}
              key={path}
              selected={location.pathname === path}
            >
              <Span fontSize="medium" fontWeight="semiBold">
                {name}
              </Span>
            </ListItem>
          ))}
        </NavList>
      </Box>
    </SpaceVertical>
  );
};

export default Navigation;
