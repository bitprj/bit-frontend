import React from "react";
import styled from "styled-components";

const Featured = styled.div`
  padding: 4em 2.5em;
  padding-right: 16em;
  height: 20em;
  width: 40em;
  position: relative;

  border-radius: 0.8em;
  background: ${props => props.theme.accentVariant} url(${props => props.url});
  ${props => (props.bgColor ? `background-color: ${props.bgColor}` : "")};
  background-size: 100% auto;
  background-position: bottom right;
`;

const Category = styled.div`
  position: absolute;
  bottom: 2em;
  left: 2.5em;
  font-weight: bold;
`;

const FeaturedDisplay = props => {
  return (
    <Featured url={props.imgURL} bgColor={props.bgColor}>
      <h1 style={{ margin: 0 }}>{props.name}</h1>
      <Category>{props.category}</Category>
    </Featured>
  );
};

export default FeaturedDisplay;
