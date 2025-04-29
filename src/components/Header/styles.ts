import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { space } from "styled-system";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 16px;
  ${space};
  padding-inline: 32px;
  padding-block: 40px;
  box-shadow: 3px 2px 15px 5px #00000026;
  z-index: 1
`;

export const Logo = styled(NavLink)`
  color: #C8030F;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`;
