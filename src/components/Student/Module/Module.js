import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import StudentHero from "../../../components/Student/StudentHero";
import ProgressCircle from "../../shared/ProgressCircle";
import FinalProjectModal from "./FinalProject";
import Circle from "../../../assets/icons/circle";

import media from "../../../assets/styles/Media";

const Content = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: start;
  font-size: 90%;
  margin: 0 8em;
  position: relative;

  ${media.thone`
    flex-direction: column;
  `}

  ${media.desktop`
    margin: 0 2em;
  `}
`;

const TutorialsContainer = styled.div`
  flex: 1;
  margin: 1em;
  margin-right: 3em;
  padding: 0 2em 4em;
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
    left: 4.375em;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ebebeb;
    z-index: -1;
  }

  ${media.thone`
    margin: 1em auto;
  `}

  ${media.desktop`
    margin-right: 1em;
  `}
`;
const ActivityList = styled.div`
  display: grid;
  grid-row-gap: 2em;
`;
const ActivityTitle = styled.div`
  margin: 3.5em 0;
  display: flex;
  align-items: center;

  background-color: #fff;
`;
const ActivityContainer = styled.div`
  padding: 1.5em 0;
  padding-right: 1.5em;
  display: flex;
  align-items: center;

  cursor: pointer;
  transition: ease box-shadow 0.15s;

  &:hover {
    background-color: white;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  }
`;
const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
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
    box-shadow: 0px 12px 24px rgba(38, 38, 38, 0.3);
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
      <StudentHero for={"MODULE"} heroBgColor="#0a192f" cardBgColor="#172A45" />

      <Content>
        <TutorialsContainer>
          <ActivityTitle>
            <ProgressWrapper>
              <ProgressCircle size={"4em"} value={60} color={"#0070f3"} />
            </ProgressWrapper>
            <ActivityContent>
              <h2 style={{ marginLeft: "1em" }}>Tutorials</h2>
            </ActivityContent>
          </ActivityTitle>

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

      <FinalProjectModal
        open={open}
        closed={handleClose}
        name="Tip Calculator"
        description="Design a calculator to calculate the tip you have to leave when you go to a restaurant"
        img="http://squareone.co.in/wp-content/uploads/2018/08/food-Birsto-Oakwood-Premier12-720x700.jpg"
        time="4 hours"
      />
    </>
  );
};

export default Module;
