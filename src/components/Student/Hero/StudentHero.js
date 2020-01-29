import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ProgressCard from "./ProgressCard";

import { setViewStudent } from "../../../redux/actions/viewManager";
import * as viewTypes from "../../../redux/utils/viewTypes";

const HeroBackground = styled.div`
  background-color: ${props => props.theme.bg};
  position: absolute;
  left: 0;
  right: 0;
  height: 40em;
  clip-path: ellipse(110% 70% at 63% 25%);
`;

const HeroContainer = styled.div`
  padding: 2.5em;
  padding-bottom: 2em;
  display: flex;
  flex-flow: row wrap;
  color: white;
  position: relative;
`;

const DescriptionWrapper = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  width: 70%;
`;

const CardWrapper = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
`;

const ProgressBar = styled.div`
  margin-top: 2em;
  width: 90%;
  height: 0.5em;
  background-color: ${props =>
    props.theme.fontInvert.length === 4
      ? props.theme.fontInvert + "c"
      : props.theme.fontInvert + "cc"};
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${props => props.progress};
    background-color: ${props => props.theme.accent};
  }
`;

const Back = styled.p`
  cursor: pointer;
  display: inline-block;
  transition: ease color 0.15s;

  &:hover {
    color: ${props => props.theme.accentVariant};
  }
`;

const StudentHero = props => {
  const resumeClickedHandler = () => {
    // go to current lab
  };

  return (
    <>
      <HeroBackground />
      <HeroContainer>
        <DescriptionWrapper>
          <Description>
            {props.for === "TOPIC" ? (
              <>
                <h1 style={{ margin: 0 }}>Intro to Python</h1>
                <p>
                  Coding Best Practices are a set of informal rules that the
                  software development community has learned over time which can
                  help improve the quality of software
                </p>
              </>
            ) : null}

            {props.for === "MODULE" ? (
              <>
                <Back
                  onClick={() => props.onSetViewStudent(viewTypes.PROGRESS)}
                >
                  &#8249; Back to Topics
                </Back>
                <h1 style={{ margin: 0, whiteSpace: 'nowrap' }}>Programming Principles</h1>
                <p>
                  Coding Best Practices are a set of informal rules that the
                  software development community has learned over time which can
                  help improve the quality of software
                </p>
                <ProgressBar progress={"69%"} />
              </>
            ) : null}
          </Description>
        </DescriptionWrapper>
        <CardWrapper>
          <ProgressCard
            type="VERTICAL"
            image={props.suggestedActivity.image}
            name={props.suggestedActivity.name}
            description={props.suggestedActivity.description}
            buttonClicked={() => props.resumeClicked}
          />
        </CardWrapper>
      </HeroContainer>
    </>
  );
};

/**
 * ===================== DEPRECATED INFO =======================
 * Component will update two times (at least). Further updates are caused by
 * subscription feature and updates elsewhere in application
 *    > [FIRST] when student_data will be loaded (causing update):
 *        - request already has been dispatched in 'Student.js' for suggested_activity
 *        - suggested_activity does not exist yet...
 *        - everything will be empty except 'required' object
 *    > [SECOND] when suggested_activity will be loaded by dispatch earlier (causing update):
 *        - everything will be rendered
 */
const mapStateToProps = state => {
  const studentData = state.studentData; // creating reference for less typing
  const newProps = {};

  let studentName = "";
  if (studentData.is_student_data_loaded) {
    studentName = studentData.name;
  }
  newProps.studentName = studentName;

  // if (ownProps.for === "CURRENT") {
  let suggestedActivity = {};
  if (!studentData.suggested_activity) {
    suggestedActivity = {
      image: "",
      name: "",
      description: ""
    };
  } else {
    suggestedActivity = {
      image: "github",
      name: studentData.suggested_activity.name,
      description:
        "Bacon ipsum dolor amet pancetta short ribs pig shankle chicken. Kielbasa ribeye salami jerky ham hock short ribs."
    };
  }
  newProps.suggestedActivity = suggestedActivity;
  // }
  return newProps;
};

const mapDispatchToProps = dispatch => {
  return {
    onSetViewStudent: viewName => {
      dispatch(setViewStudent(viewName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentHero);
