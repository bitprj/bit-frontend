import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import StudentHero from "../../../components/Student/StudentHero";
import ProgressCircle from "../../shared/ProgressCircle";
import FinalProjectModal from "./FinalProject";
import Circle from "../../../assets/icons/circle";

import { PHONE, TABLET } from '../../global/media'

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

const TutorialsContainer = styled.div`
  flex: 1;
  margin: 1em;
  padding: 0 4em 4em 0;
  border-radius: 0.5em;
  background-color: white;
  position: relative;
  z-index: 1;

  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);

  &:before {
    content: "";
    display: block;
    width: 0.25em;
    height: 60%;
    position: absolute;
    left: 15%;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ebebeb;
    z-index: -1;
  }

  @media screen and (max-width: ${PHONE}) {
    margin: 1em auto;
  }
  
  @media screen and (min-width: ${TABLET}) {
    margin-right: 3em;
  }
`;
const ActivityList = styled.div`
  display: grid;
  grid-row-gap: 6em;
`;
const ActivityContainer = styled.div`
  display: flex;
`;
const ProgressWrapper = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1em;
  background-color: #fff;
`;
const CircleWrapper = styled.div`
  background-color: #fff;
  width: 3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ActivityContent = styled.div`
  flex: 7;
`;

const PickContainer = styled.div`
  flex: 1;
  margin: 1em;
  padding-top: 2.5em;
  border-radius: 0.5em;
  background-color: white;
  text-align: center;
  position: relative;
  cursor: pointer;
  top: 4em;
  transition: 0.25s ease all;

  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 24px rgba(38, 38, 38, 0.5);
  }
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
const PickImg = styled.img`
  width: 100%;
  border-radius: 0 0 0.5em 0.5em;
  position: relative;
  bottom: 0;
`;

const Module = props => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const activityContentList = [...Array(3)].map((project, index) => {
    return (
      <ActivityContainer key={`module-${index}`}>
        <ProgressWrapper>
          <CircleWrapper>
            <Circle color={"#0070f3"} width={"1em"} />
          </CircleWrapper>
        </ProgressWrapper>
        <ActivityContent>
          <h3 style={{ margin: 0 }}>Intro to Command Line</h3>
          <p style={{ margin: 0 }}>
            Learn to directly communicate with your computer.
          </p>
        </ActivityContent>
      </ActivityContainer>
    );
  });

  return (
    <>
      <StudentHero for={"MODULE"} />

      <Content>
        <TutorialsContainer>
          <ActivityContainer style={{ padding: "3.5em 0" }}>
            <ProgressWrapper>
              <ProgressCircle size={"4em"} value={60} color={"#0070f3"} />
            </ProgressWrapper>
            <ActivityContent>
              <h2>Tutorials</h2>
            </ActivityContent>
          </ActivityContainer>

          <ActivityList>{activityContentList}</ActivityList>
        </TutorialsContainer>

        <PickContainer onClick={handleOpen}>
          <h2>Pick a Project</h2>
          <p>
            Choose a Project to apply <br /> what you have learned!
          </p>
          <PickButton>+</PickButton>
          <PickImg src="https://cdn.dribbble.com/users/418188/screenshots/5694634/moonworkers_digital_illustration_tubik_2x.png"></PickImg>
        </PickContainer>
      </Content>

      <FinalProjectModal open={open} closed={handleClose} />
    </>
  );
};

export default Module;
