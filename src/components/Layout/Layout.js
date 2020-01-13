import React from 'react';

import NavBar from './NavBar'

const Layout = (props) => (
    <>
        <NavBar />
        <main>
            {props.children}
        </main>
    </>
)

export default Layout;
