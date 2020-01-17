import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Button from "../shared/Button";

const contentHeight = "2.5em";

const Nav = styled.nav`
  font-size: 108%;
  padding: 0.8em 1em;
  box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const NavElement = styled.div`
  margin: 0 1em;
  line-height: ${contentHeight};
`;

const StudentContainer = styled.div``;

const VisitorContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const SearchBarContainer = styled.div`
  position: relative;
  background-color: #f1f1f1;
  border-radius: ${contentHeight};
  display: flex;
`;

const SearchBar = styled.input`
  width: 100%;
  line-height: ${contentHeight};
  border: none;
  background: none;
  outline: none;
  padding-left: 1.25em;
  padding-right: ${contentHeight};
  cursor: text;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  width: ${contentHeight};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  cursor: pointer;
`;

const ProfPicWrapper = styled.div``;

const MuiIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: ${contentHeight};
  height: ${contentHeight};
`

const styledLink = {
  color: "black",
  textDecoration: "none"
};

const NavBar = props => (
  <Nav>
    <NavElement style={{ height: contentHeight }}>
      <Link to={"/student"}>
        <Logo src={require("../../assets/icons/logo.png")} alt="Bit Project" />
      </Link>
    </NavElement>
    <NavElement>
      <Link style={styledLink} to={"/learn"}>
        Explore
      </Link>
    </NavElement>
    <NavElement>
      <Link style={styledLink} to={"/"}>
        Community
      </Link>
    </NavElement>

    {props.userType === "Student" ? (
      <>
        <NavElement style={{ flex: "1" }}>
          <SearchBarContainer>
            <SearchBar />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </SearchBarContainer>
        </NavElement>

        <NavElement>
          <MuiIconWrapper>
            <NotificationsOutlinedIcon />
          </MuiIconWrapper>
        </NavElement>

        <NavElement>
          <Link style={styledLink} to={"/logout"}>
            <ProfPicWrapper>
              {/* <AccountCircleIcon style={{ height: "100%" }} /> */}
            </ProfPicWrapper>
            <span>Bob</span>
          </Link>
        </NavElement>
      </>
    ) : null}

    {props.userType === "Visitor" ? (
      <VisitorContainer>
        <Link style={styledLink} to={"/login"}>
          <Button
            buttonState="Login"
            class_name="invert less-round"
            style={{ margin: "0 0.25em", width: "7.5em" }}
          />
        </Link>

        <Link style={styledLink} to={"/login"}>
          <Button
            buttonState="Sign Up"
            class_name="outline less-round"
            style={{ margin: "0 0.25em", width: "7.5em" }}
          />
        </Link>
      </VisitorContainer>
    ) : null}
  </Nav>
);

const mapStateToProps = state => ({
  userType: state.reducer.userType
});

export default connect(mapStateToProps)(NavBar);
