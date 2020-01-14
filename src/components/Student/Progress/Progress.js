import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import StudentHero from "../../../components/Student/StudentHero";
import ActivityCard from "./ActivityCard";

import { setViewStudent } from "../../../redux/actions/viewManager";
import * as viewTypes from "../../../redux/utils/viewTypes";

import { PHONE, TABLET } from "../../../assets/styles/Media";
// const P

const Content = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: start;
  font-size: 90%;
  margin: 0 2em;
  position: relative;

  @media screen and (max-width: ${PHONE}) {
    flex-direction: column;
  }

  @media screen and (min-width: ${TABLET}) {
    margin: 0 8em;
  }
`;

const ColOne = styled.div`
  flex: 1;
`;

const ColTwo = styled.div`
  flex: 1;
  position: relative;
  top: 5em;
`;

const PickModule = styled.div`
  margin: 2%;
  margin-top: 0;
  padding: 2em;
  height: 20em;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  border-radius: 1em;
  background-color: #fff;
  text-align: center;

  display: flex;
  align-items: center;
`;
const PickButton = styled.div`
  font-size: 1.5em;
  margin: 1.5em auto 1em;
  border-radius: 0.2em;
  color: white;
  width: 1.5em;
  height: 1.5em;
  background-color: #007bed;
  box-shadow: 0 0 7px 7px #007bed07;
  cursor: pointer;

  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: none;
  }
`;

const Progress = props => {
  return (
    <>
      <StudentHero for={"TOPIC"} heroBgColor={"#000"} cardBgColor={"#232323"} />

      <Content>
        <ColOne>
          <PickModule>
            <div>
              <h2>Pick a Module</h2>
              <p style={{ padding: "0 3em" }}>
                Choose a module and learn an interesting tidbit about python
              </p>
              <PickButton>+</PickButton>
            </div>
          </PickModule>

          <ActivityCard isLeft />
          <ActivityCard isLeft isLast />
        </ColOne>

        <ColTwo>
          <ActivityCard
            clicked={() => props.onSetViewStudent(viewTypes.MODULE)}
          />
          <ActivityCard />
        </ColTwo>
      </Content>
    </>
  );
};

// const mapStateToProps = state => {
//   return {
//     // ...state.studentData
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onSetViewStudent: viewName => {
      dispatch(setViewStudent(viewName));
    }
  };
};

export default connect(null, mapDispatchToProps)(Progress);
