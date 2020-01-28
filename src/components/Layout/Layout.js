import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const Main = styled.main`
  background-color: ${props => props.theme.bgPage};
  position: relative;
`;

const Layout = props => (
  <>
    <NavBar />
    <Main>{props.children}</Main>
  </>
);

export default Layout;
