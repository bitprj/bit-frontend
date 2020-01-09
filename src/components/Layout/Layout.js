import React, { Fragment } from 'react';

import NavBar from './NavBar'

const Layout = (props) => (
    <Fragment>
        <NavBar />
        <main>
            {props.children}
        </main>
    </Fragment>
)

export default Layout;
