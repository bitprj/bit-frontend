import React from "react";
import styled from "styled-components";

const ActivityCardWrapper = styled.div`
  margin: 6em 3em;
  position: relative;
`;

const RenderActivityCard = styled.div`
  padding: 3em 3em 0;
  height: 24em;
  border-radius: 1em;
  background-color: #fff;
  text-align: center;
  display: inline-block;
  overflow-y: auto;
  cursor: pointer;
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
    <ActivityCardWrapper onClick={props.clicked}>
      <RenderActivityCard className="hover-raise transition-medium">
        <StatusContainer>+</StatusContainer>
        <h2>Python Basics</h2>
        <p>Choose a module to learn an interesting tidbit about Python</p>
      </RenderActivityCard>
      {!props.isLast ? <DottedLine isLeft={props.isLeft} /> : null}
    </ActivityCardWrapper>
  );
};

export default ActivityCard;
