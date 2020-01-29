import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import NavBar from "./NavBar";

const Main = styled.main`
  background-color: ${props => props.theme.bgPage};
  position: relative;
`;

const Layout = props => (
  <>
    <Route path="/learn" />
    <Route path="/" exact component={NavBar} />
    <Main>{props.children}</Main>
  </>
);

export default Layout;
