import React from 'react';

import Aux from '../HOC/Auxiliary';

import NavBar from './NavBar'

const Layout = (props) => (
    <Aux>
        <NavBar />
        <main>
            {props.children}
        </main>
    </Aux>
)

export default Layout;
