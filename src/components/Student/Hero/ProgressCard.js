import React from "react";
import styled from "styled-components";

import BrickWall from "../../../assets/icons/brickwall";
import GitHub from "../../../assets/icons/github";

import StatusIcon from "../../shared/gadgets/StatusIcon";
import Button from "../../shared/gadgets/NewButton";

const RenderedCard = styled.div`
  background-color: ${props => props.theme.bgVariant};
  color: #fff;
  padding: 2em;
  margin: 0.5em;
  position: relative;
  min-height: 15em;
  cursor: ${props => (props.type === "VERTICAL" ? "auto" : "pointer")};
  text-align: center;
  width: ${props => (props.type === "VERTICAL" ? "17em" : "auto")};

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.05);
  }
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
    <RenderedCard
      className="hover-lift-shadowless transition-medium"
      type={props.type}
      width={props.width}
      onClick={props.clicked}
    >
      <IconWrapper>{renderAppropriateImage(props.image, "3em")}</IconWrapper>
      <Name>{props.name}</Name>
      <Description>{props.description}</Description>
      {props.type === "VERTICAL" ? (
        <Button
          light={"#fff"}
          dark={"#000"}
          margin={"1em 0 0.5em"}
          clicked={() => props.buttonClicked}
        >
          Resume
        </Button>
      ) : (
        <StatusWrapper>
          <StatusIcon type={props.status} />
        </StatusWrapper>
      )}
    </RenderedCard>
  );
};

export default ActivityCard;
