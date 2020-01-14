import React from "react";
import styled from "styled-components";

const RenderActivityCard = styled.div`
  margin: 3.3em;
  padding: 3em 3em 0;
  min-height: 24em;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  border-radius: 1em;
  background-color: #fff;
  text-align: center;
  display: inline-block;
  position: relative;
`;
const DottedLine = styled.div`
  border-bottom: 3px #eaeaea dashed;
  position: absolute;
  width: 100%;
  left: ${props => (props.isLeft ? "50%" : "-50%")};
  bottom: 4.2em;
  z-index: -1;
}`;

const StatusContainer = styled.div`
  margin: 0 auto;
  border-radius: 2px;
  color: white;
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgreen;
  box-shadow: 0 0 7px lightgreen;
`;

const ActivityCard = props => {
  return (
    <RenderActivityCard onClick={props.clicked}>
      <StatusContainer>+</StatusContainer>
      <h2>Python Basics</h2>
      <p>Choose a module to learn an interesting tidbit about Python</p>
      {!props.isLast ? <DottedLine isLeft={props.isLeft} /> : null}
    </RenderActivityCard>
  );
};

export default ActivityCard;
