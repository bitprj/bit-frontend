import React from "react";
import styled from "styled-components";

import ClampedText from '../../shared/ClampedText'
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const Container = styled.div`
  margin: 0.75em 0;
  padding: 1.5em;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 95%;

  transition: ease box-shadow 0.15s;

  &:hover {
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  margin-right: 1em;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 2em;
`;

const Sparkles = styled.div`
  padding: 0.5em 0.7em;
  top: calc(100% - 1em);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  border-radius: 1em;
  line-height: 0.8em;
  background-color: #fff;
  font-size: 125%;
  text-align: center;
  white-space: nowrap;
`;

const Description = styled.div`
  margin-left: 7px;
`;

const Time = styled.span`
  line-height: 1em;
  margin-left: 0.4em;
`;

const Project = props => {
  return (
    <Container onClick={props.clicked}>
      <IconContainer>
        <img
          alt="Icon"
          style={{ width: "7em", borderRadius: "1.25em" }}
          src={props.img}
        />
        <Sparkles>
          <span role="img" aria-label="sparkles">
            ✨
          </span>
          40
        </Sparkles>
      </IconContainer>

      <Description>
        <h2 style={{ margin: 0 }}>{props.name}</h2>
        <ClampedText style={{ margin: "0.5em 0" }}>
          {props.description}
        </ClampedText>
        <p style={{ display: "flex", margin: 0 }}>
          <AccessTimeIcon style={{ fontSize: "initial" }} />
          <Time>{props.time}</Time>
        </p>
      </Description>
    </Container>
  );
};

export default Project;
