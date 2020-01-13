import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import BrickWall from "../../../assets/icons/brickwall";

import { PHONE } from '../../global/media'

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "125%"
  }
}));

const Content = styled.div`
  margin: 4em;
  padding: 16px 8px 0;
  // border: 3px #beefff solid; 
  border-radius: 5px;
  max-width: 45em;
  flex: 1;
  outline: 0;
  height: 75%;
  overflow-y: scroll;

  display: block;
  background-color: #fff;

  @media screen and (orientation: landscape) {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 3fr 4fr;
    overflow-y: hidden;
    // height: 60%;
  }

  @media screen and (orientation: landscape) and (max-height: ${PHONE}) {
    overflow-y: scroll;
  }
`;

const Choose = styled.div`
  padding: 10px 40px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (orientation: portrait) {
    padding-right: 40px;
  }
`;

const ChooseImg = styled.div`
  display: flex;
  justify-content: center;
`;

const Description = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 80%;
  max-width: 20em;
  margin: 0 auto;
`;

const Sparkles2 = styled.div`
  box-shadow: 0 0 7px 7px #f2f2f2;
  border-radius: 1em;
  line-height: 0.8em;
  padding: 0.5em 0.7em;
`;

const Projects = styled.div`
  flex: 4;
  overflow-y: scroll;
`;

const ProjectContainer = styled.div`
  margin: 10px;
  padding: 20px 10px;
  box-shadow: 0 0 7px 5px #f2f2f2;
  position: relative;
  display: flex;
`;

const Sparkles = styled.div`
  box-shadow: 0 0 7px 7px #f2f2f2;
  border-radius: 1em;
  line-height: 0.8em;
  padding: 0.5em 0.7em;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ProjectImg = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Project = props => {
  return (
    <ProjectContainer>
      <ProjectImg>
        <BrickWall color="#E5D7FF" width={"69px"} />
      </ProjectImg>
      <div
        style={{
          marginLeft: "7px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <h3 style={{ margin: 0 }}>Bank Records</h3>
        <p style={{ margin: 0 }}>
          Code a bank record database with Python, GitHub, and Command Line
        </p>
      </div>
      <Sparkles>* 40</Sparkles>
    </ProjectContainer>
  );
};

const FinalProject = props => {
  const classes = useStyles();

  const projects = [...Array(4)].map((project, index) => {
    return <Project key={`project-${index}`}/>;
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.closed}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.open}>
        <Content>
          <Choose style={{ flex: "3" }}>
            <ChooseImg>
              <img
                src="https://projectbit.s3-us-west-1.amazonaws.com/humaaans/1_2x.png"
                alt=""
                style={{width: '12em'}}
              ></img>
            </ChooseImg>
            <Description>
              <h2 style={{ marginBottom: 0 }}>Choose a Project</h2>
              <p>
                Choose a Project to practice your newfound knowledge in
                Programming Principles, GitHub, Command Lines, and other things.
              </p>
              <Sparkles2>* 0/110</Sparkles2>
            </Description>
          </Choose>
          <Projects>{projects}</Projects>
        </Content>
      </Fade>
    </Modal>
  );
};

export default FinalProject;
