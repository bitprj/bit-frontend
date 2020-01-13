import React from "react";
import styled from "styled-components";

import BrickWall from "../../assets/icons/brickwall";
import GitHub from "../../assets/icons/github";

import StatusIcon from "../shared/StatusIcon";
import Button from "../shared/Button";

const RenderedCard = styled.div`
  background-color: #172A45;
  color: #fff;
  padding: 2em;
  margin: 0.5em;
  position: relative;
  min-height: 15em;
  cursor: ${props => (props.type === "VERTICAL" ? "auto" : "pointer")};
  transition: all 0.2s ease-out;
  text-align: center;
  width: ${props => (props.type === "VERTICAL" ? "17em" : "auto")};

  &:hover {
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.5);
    transform: translateY(-4px);
    background-color: #223e67;
  }

  // @media screen and (max-width: 1199px) {
  //   min-width: 200px;
  // }

  // @media screen and (max-width: 1000px) {
  //   max-width: 200px;
  //   min-width: 150px;
  // }

  // @media screen and (max-width: 657px) {
  //   font-size: 125%;
  // }
`;

const IconWrapper = styled.div`
  margin: 10% 0;
`;

const Name = styled.h3`
  margin: 0.5em 0;
`;

const Description = styled.p`
  margin: 0.5em 0;
  font-size: 80%;
  padding: 0 10%;
  // min-height: 
`;

const StatusWrapper = styled.div`
  position: absolute;
  margin: 0 auto 1em;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ActivityCard = props => {
  const renderAppropriateImage = (imageName, width, height) => {
    switch (imageName) {
      case "brickwall":
        return <BrickWall color="#FFF" width={width} height={height} />;

      case "github":
        return <GitHub color="#FFF" width={width} height={height} />;

      default:
        return null;
    }
  };

  return (
    <RenderedCard onClick={props.clicked} type={props.type} width={props.width}>
      <IconWrapper>{renderAppropriateImage(props.image, "3em")}</IconWrapper>
      <Name>{props.name}</Name>
      <Description>{props.description}</Description>
      {props.type === "VERTICAL" ? (
        <Button
          buttonState={"Resume"}
          class_name="button invert"
          clicked={() => props.buttonClicked}
        />
      ) : (
        <StatusWrapper>
          <StatusIcon type={props.status} />
        </StatusWrapper>
      )}
    </RenderedCard>
  );
};

export default ActivityCard;
