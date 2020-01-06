import React from 'react';

import Auxiliary from '../HOC/Auxiliary';

import NavBar from './NavBar'

const Layout = (props) => (
    <Auxiliary>
        <NavBar />
        <main>
            {props.children}
        </main>
    </Auxiliary>
)

export default Layout;
