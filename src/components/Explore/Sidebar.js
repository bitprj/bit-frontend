import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2em 3em;
  padding-right: 0;
  width: 18em;
`;

const MenuItem = styled.div`
  margin: 0.8em 0;
  padding: 0.3em 0.8em;
  padding-right: 1em;
  border-radius: 50em;
  width: fit-content;

  cursor: pointer;
  transition: ease 0.25s all;

  &:hover {
    background-color: #0002;
  }

  &.active {
    color: #fff;
    background-color: #000;
    cursor: default;
  }
`;

const Sidebar = props => {
  const handleClick = name => {
    props.setActiveName(name);
    console.log(name)
  };

  const sidebarItems = props.views.map((view, index) => {
    const className = props.activeName === view.name ? "active" : "";
    return (
      <MenuItem
        key={`sidebar-${index}`}
        className={className}
        onClick={() => handleClick(view.name)}
      >
        {view.name}
      </MenuItem>
    );
  });

  return (
    <Container>
      <h1>Explore</h1>
      {sidebarItems}
    </Container>
  );
};

export default Sidebar;
