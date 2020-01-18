import React from "react";
import styled from "styled-components";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { sizes } from "../../assets/styles/Media";

const Container = styled.div`
  margin: 0 2em;
  border-radius: 5px;
  max-width: 45em;
  flex: 1;
  outline: 0;
  overflow-y: auto;
  font-size: 125%;
  height: 36em; // ipad vertical
  ${props => (props.type === "PANELS" ? "display: flex" : "")};
  ${props =>
    props.type === "POST" ? "flex-direction: column; display: flex" : ""};
  background-color: #fff;

  @media screen and (orientation: landscape) {
    overflow-y: hidden;
    font-size: 100%;
  }

  @media screen and (orientation: landscape) and (max-height: ${sizes.tablet}px) {
    height: calc(100% - 4em);
  }

  // target vertical phone
  @media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
    overflow-y: auto;
    ${props => (props.type === "PANELS" ? "flex-direction: column" : "")};
    height: calc(100% - 10em);
  }
`;

/**
 * PANELS
 * - left panel, right panel
 */
const LeftPanel = styled.div`
  flex: 3;
  position: relative;

  @media screen and (orientation: portrait) {
    padding-right: 40px;
  }

  @media screen and (orientation: landscape) and (max-height: 500px) {
    overflow-y: auto;
  }
`;
const RightPanel = styled.div`
  font-size: 80%;
  flex: 4;
  overflow-y: auto;
`;

/**
 * POST
 * - header, content, optional submit
 */
const Header = styled.div`
  flex: 1;
  background-color: black;
  color: white;
`;
const Content = styled.div`
  flex: ${props => props.flex || 2};
`;

const DynamicModal = props => {
  const contentType = () => {
    switch (props.type) {
      case "PANELS":
        return (
          <>
            <LeftPanel>{props.leftPanel}</LeftPanel>
            <RightPanel>{props.rightPanel}</RightPanel>
          </>
        );

      case "POST":
        return (
          <>
            <Header>{props.header}</Header>
            <Content flex={props.contentRatio}>{props.content}</Content>
            {props.children}
          </>
        );

      default:
        return props.children;
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.closed}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Fade in={props.open}>
        <Container type={props.type}>{contentType()}</Container>
      </Fade>
    </Modal>
  );
};

export default DynamicModal;
