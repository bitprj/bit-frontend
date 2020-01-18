import React from "react";
import styled from "styled-components";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import IconLine from "../shared/gadgets/IconLine";
import AppIcon from "../shared/gadgets/AppIcon";

const Container = styled.div`
  margin-top: 2em;
`;

const RenderedActivity = styled.div`
  margin: 2em 0;
  margin-right: 2em;
  display: flex;
  align-items: center;
`;

const Activity = props => {
  return (
    <RenderedActivity>
      <AppIcon borderRadius="1.4em" marginRight="1.6em" />
      <div>
        <h3 style={{ margin: 0 }}>{props.name}</h3>
        <IconLine icon={<AccessTimeIcon />}>{props.time}</IconLine>
      </div>
    </RenderedActivity>
  );
};

const TopicDisplay = props => {
  return (
    <Container>
      <h1>{props.name}</h1>
      <Activity name="Intro to Kubernetes" time="4 weeks" />
      <Activity name="Continuous Integration" time="4 weeks" />
      <Activity name="Intro to DevOps" time="4 weeks" />
      <Activity name="Code Reviewing" time="4 weeks" />
    </Container>
  );
};

export default TopicDisplay;
