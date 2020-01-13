import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';

const Nav = styled.div`
    padding: 10px;
    box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    flex: 1;
    position: relative;
    height: 40px;
`

const styledLink = {
    fontSize: '16px',
    color: 'black',
    textDecoration: 'none'
}

const NavBar = (props) => (
    <Nav>
        <Link style={styledLink} to={"/"}>BitProject</Link>
        {(props.userType === "Student") ? <Link style={styledLink} to={"/learn"}>Learn</Link> : null}
        {(props.userType === "Student") ? <Link style={styledLink} to={"/student"}>Student</Link> : null}
        {(props.userType === "Visitor") ? <Link style={styledLink} to={"/login"}>Login</Link> : <Link style={styledLink} to={"/logout"}>Logout</Link>}
    </Nav>
)

const mapStateToProps = state => ({
    userType: state.reducer.userType
})

export default connect(mapStateToProps)(NavBar);
