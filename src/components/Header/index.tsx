import React from "react";
import { Container, Logo } from "./styles";
import Icon from "../../assets/logo.svg";
import { DividerVertical } from "@looker/components";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <Container>
      <Icon cursor={"pointer"} onClick={() => { history.replace('/')}} />
      <DividerVertical style={{ backgroundColor: "#F1F1F1" }} height={"60%"} />
      <Logo to="/">Audience Management Console</Logo>
    </Container>
  );
};
export default Header;
