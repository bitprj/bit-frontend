import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';

const Nav = styled.div`
    height: 50px;
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

const NavBar = (props) => (
    <Nav>
        <Link to={"/"}><h1>Bit Project</h1></Link>
        {(props.userType === "Student") ? <Link to={"/learn"}>Learn</Link> : null}
        {(props.userType === "Student") ? <Link to={"/student"}>Student</Link> : null}
        {(props.userType === "Visitor") ? <Link to={"/login"}>Login</Link> : <Link to={"/logout"}>Logout</Link>}
    </Nav>
)

const mapStateToProps = state => ({
    userType: state.reducer.userType
})

export default connect(mapStateToProps)(NavBar);
