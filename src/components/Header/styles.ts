import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { space } from "styled-system";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgb(227 227 227);
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${space};
  padding: 1.5rem;
`;

export const Logo = styled(NavLink)`
  color: #000;
  margin: 0;
  font-size: 24px;
  font-weight: 200;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`;
