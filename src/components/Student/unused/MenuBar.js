import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setViewStudent } from "../../../redux/actions/viewManager";

import "./Student.css";

const Menu = styled.div`
  box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
  flex-wrap: wrap;
  display: flex;
  text-align: center;
`;

const Tab = styled.div`
  transition: 0.2s ease;
  padding: 15px 0;
  flex: 1;

  &:hover {
    color: #0070f3;
    cursor: pointer;
  }
`;

const MenuBar = props => {
  const windowTitles = ["Curriculum", "Activity", "Progress", "Profile"];

  const windowPortals = windowTitles.map((title, index) => {
    return (
      <Tab
        key={`menubar-${index}`}
        className={
          title.toUpperCase() === props.currentView.toUpperCase()
            ? "menu-tab-active"
            : null
        }
        onClick={() => props.onSetViewStudent(title.toUpperCase())}
      >
        {title}
      </Tab>
    );
  });

  return <Menu>{windowPortals}</Menu>;
};

const mapDispatchToProps = dispatch => {
  return {
    onSetViewStudent: viewName => {
      dispatch(setViewStudent(viewName));
    }
  };
};

export default connect(null, mapDispatchToProps)(MenuBar);
