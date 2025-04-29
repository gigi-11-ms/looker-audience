import React, { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  ListItem,
  NavList,
  Button,
  Box,
  Span,
  SpaceVertical,
  Divider,
} from "@looker/components";
import { NavItemType } from "./types";
import {
  AUDIENCES_PAGE,
  CONFIGURATION_PAGE,
  CREATE_AUDIENCE_PAGE,
  MONITORING_PAGE,
  SCHEDULED_TASKS_PAGE,
} from "../../routes/config";
import { StyledList } from "./styles";

const NavigationElements: NavItemType[] = [
  {
    name: "My Audiences",
    path: AUDIENCES_PAGE,
  },
  {
    name: "Scheduled Tasks",
    path: SCHEDULED_TASKS_PAGE,
    disabled: true,
  },
  {
    name: "Monitoring",
    path: MONITORING_PAGE,
  },
  {
    name: "Configuration",
    path: CONFIGURATION_PAGE,
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
      <Divider style={{ backgroundColor: "#F1F1F1" }} />
      <Box width={"100%"}>
        <StyledList>
          {NavigationElements.map(({ name, path, disabled }) => (
            <ListItem
              onClick={() => handleMenuItemClick(path)}
              key={path}
              selected={location.pathname === path}
              disabled={disabled}
            >
              <Span fontSize="medium" fontWeight="semiBold">
                {name}
              </Span>
            </ListItem>
          ))}
        </StyledList>
      </Box>
    </SpaceVertical>
  );
};

export default Navigation;
