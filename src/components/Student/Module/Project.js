import React from "react";
import styled from "styled-components";

import ClampedText from "../../shared/utils/ClampedText";
import AppIcon from "../../shared/gadgets/AppIcon";
import IconLine from "../../shared/gadgets/IconLine";
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

const Project = props => {
  return (
    <Container onClick={props.clicked}>
      <AppIcon width="7em" url={props.imgURL} />
      <Sparkles>
        <span role="img" aria-label="sparkles">
          ✨
        </span>
        40
      </Sparkles>

      <Description>
        <h2 style={{ margin: 0 }}>{props.name}</h2>
        <ClampedText style={{ margin: "0.5em 0" }}>
          {props.description}
        </ClampedText>
        <IconLine icon={<AccessTimeIcon />}>{props.time}</IconLine>
      </Description>
    </Container>
  );
};

export default Project;
