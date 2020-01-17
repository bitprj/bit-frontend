import React, { useState } from "react";
import styled from "styled-components";

import DynamicModal from "../../shared/DynamicModal";
import { sizes } from "../../../assets/styles/Media";

import Project from "./Project";

import DotRating from "../../shared/DotRating";

// const Sparkles2 = styled.div
//   box-shadow: 0 0 7px 7px #f2f2f2;
//   border-radius: 1em;
//   line-height: 0.8em;
//   padding: 0.5em 0.7em;
// `;

const FullImg = styled.div`
  width: 100%;
  height: 100%;

  background: transparent url(${props => props.img});
  background-size: auto 100%;
  background-position: center;

  @media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
    background-size: 100% auto;
  }

  @media screen and (orientation: landscape) and (max-height: 500px) {
    background-size: 100% auto;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5em 2.5em 2.5em;
`;

const Back = styled.p`
  cursor: pointer;
  display: inline-block;
  transition: ease color 0.15s;

  &:hover {
    color: #86c5ff;
  }
`;

const SmallText = styled.div`
  font-size: 80%;
`;

const StartButton = styled.button`
  padding: 1em 0;
  margin: 2em 0 1em;
  border: none;
  width: 100%;

  background-color: #007bed;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 115%;
`;

const Nbsp = styled.p`
  @media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
    display: none;
  }
`;

const FinalProject = props => {
  const [listView, setListView] = useState(true);

  /**
   * LIST VIEW
   */
  const choose = (
    <div style={{ margin: "0 auto", padding: "1.5em 2.5em 2.5em" }}>
      <Nbsp>&nbsp;</Nbsp>
      <h2 style={{ marginBottom: 0 }}>Choose a Project</h2>
      <p>
        Choose a Project to practice your newfound knowledge in Programming
        Principles, GitHub, Command Lines, and other things.
      </p>
      {/* <Sparkles2>
      ✨<span style={{ fontSize: "125%" }}>33</span>/110
      </Sparkles2> */}
    </div>
  );
  const projects = (
    <div style={{ padding: "1em" }}>
      {[...Array(4)].map((project, index) => {
        return (
          <Project
            key={`project-${index}`}
            name={props.name}
            description={props.description}
            img={props.img}
            time={props.time}
            clicked={() => setListView(false)}
          />
        );
      })}
    </div>
  );

  /**
   * DESCRIPTION VIEW
   */
  const description = (
    <ProjectInfo>
      <Back onClick={() => setListView(true)}>&#8249; Back</Back>
      <h2 style={{ margin: 0 }}>{props.name}</h2>
      <p style={{ marginBottom: 0 }}>{props.description}</p>
      <br />
      <SmallText>difficulty</SmallText>
      <DotRating rating={3} onColor="#007BED" offColor="#86C5FF" />
      <br />
      <SmallText>estimated time</SmallText>
      <span style={{ fontWeight: "bold" }}>{props.time}</span>
      <div style={{ flexGrow: "1", display: "flex", alignItems: "flex-end" }}>
        <StartButton>Start Lab</StartButton>
      </div>
    </ProjectInfo>
  );
  const fullPic = (
    <FullImg img="http://squareone.co.in/wp-content/uploads/2018/08/food-Birsto-Oakwood-Premier12-720x700.jpg" />
  );

  return (
    <DynamicModal
      type="PANELS"
      leftPanel={listView ? choose : description}
      rightPanel={listView ? projects : fullPic}
      open={props.open}
      closed={props.closed}
    />
  );
};

export default FinalProject;
