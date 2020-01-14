import React from 'react';
import styled from 'styled-components'

import NavBar from './NavBar'

const Main = styled.main`
    background-color: #F5FAFF;
`

const Layout = (props) => (
    <>
        <NavBar />
        <Main>
            {props.children}
        </Main>
    </>
)

export default Layout;
