import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    height: 60px;
    padding: 10px;
    margin: -8px -8px 0 -8px;
    box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    flex: 1;
    position: relative;
`

const NavBar = () => (
    <Nav>
        <Link to={"/"}><h1>Bit Project</h1></Link>
        <Link to={"/learn"}>Learn</Link>
        <Link to={"/student"}>Student</Link>
    </Nav>
)

export default NavBar;
