import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ActivityCard from "./ActivityCard";
import StatusIcon from "../../shared/StatusIcon";

import { setViewStudent } from "../../../redux/actions/viewManager";
import * as viewTypes from "../../../redux/utils/viewTypes";

const RenderModuleSection = styled.div`
  margin: 2.5em auto;
  padding: 0 10%;
  padding-bottom: 4.2%;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 1.05em;
    background-color: #ccc;
    height: calc(100% - 4.2em);
    width: 0.2em;
  }
`;

const SectionName = styled.h2`
  @media screen and (max-width: 420px) {
    padding-left: 0.8em;
  }
`;

const SectionStatusWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const SectionDescription = styled.p`
  @media screen and (max-width: 420px) {
    padding-left: 0.8em;
  }
`;

const ModuleLayout = styled.div`
  margin-top: 1.5em;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  text-align: center;
`;

const ModuleSection = props => {

  const moduleCards =
    props.modules.length !== 0
      ? props.modules.map(moduleCard => {
          return (
            <ActivityCard
              key={moduleCard.id}
              name={moduleCard.id}
              image={"brickwall"}
              // description={moduleCard.description}
              description={
                "I am a static piece text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              }
              status={"locked"}
              clicked={() => props.onSetViewStudent(viewTypes.PROGRESS_MODULE)}
            />
          );
        })
      : null;

  return (
    <RenderModuleSection>
      <SectionStatusWrapper>
        <StatusIcon type={"incomplete"} />
      </SectionStatusWrapper>
      <SectionName>{props.name}</SectionName>
      <SectionDescription>{props.description}</SectionDescription>

      <ModuleLayout>{moduleCards}</ModuleLayout>
    </RenderModuleSection>
  );
};

const mapStateToProps = state => {
  const studentData = state.studentData;

  if (!studentData.current_topic) {
    return {
      name: "",
      description: "",
      modules: []
    };
  }
  return {
    name: studentData.current_topic.name,
    description:
      "I am a static piece text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    modules: studentData.current_topic.modules
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetViewStudent: viewName => {
      dispatch(setViewStudent(viewName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleSection);
