import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import BrickWall from "../../../assets/icons/brickwall";
import GitHub from "../../../assets/icons/github";

import StatusIcon from "../../shared/StatusIcon";
import Button from "../../shared/Button";

const RenderedCard = styled.div`
  background-color: #172a45;
  color: #fff;
  border-radius: 0.5em;
  padding: 2em;
  padding-top: ${props => props.type === "CURRENT" ? '1em' : '2em'}
  padding-bottom: ${props => props.type === "CURRENT" ? '1em' : '4em'};
  margin: 0.5em;
  min-width: 300px;
  max-width: 300px;
  flex: 1;
  position: relative;
  min-height: 15em;
  cursor: ${props => props.type === "CURRENT" ? 'auto' : 'pointer'};
  transition: all 0.2s ease-out;
  text-align: center;

  &:hover {
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.5);
    transform: translateY(-4px);
    background-color: #223e67;
  }

  @media screen and (max-width: 1199px) {
    min-width: 200px;
  }

  @media screen and (max-width: 1000px) {
    max-width: 200px;
    min-width: 150px;
  }

  @media screen and (max-width: 657px) {
    font-size: 125%;
  }
`;

const IconWrapper = styled.div`
  margin: 10% 0;
`;

const Name = styled.h3``;

const Description = styled.p`
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
    <RenderedCard type={props.type}>
      <IconWrapper>{renderAppropriateImage(props.image, "3em")}</IconWrapper>
      <Name>{props.name}</Name>
      <Description>{props.description}</Description>
      {props.type === "CURRENT" ? (
        <Button
          buttonState={"Resume"}
          class_name={props.buttonClass}
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

/**
 * Component will update two times (at least). Further updates are caused by 
 * subscription feature and updates elsewhere in application
 *    > [FIRST] when student_data will be loaded (causing update):
 *        - request already has been dispatched in 'Student.js' for suggested_activity
 *        - suggested_activity does not exist yet...
 *        - everything will be empty except 'required' object
 *    > [SECOND] when suggested_activity will be loaded by dispatch earlier (causing update):
 *        - everything will be rendered
 */
const mapStateToProps = (state, ownProps) => {
  const studentData = state.studentData; // creating reference for less typing

  if (ownProps.type === "CURRENT") {
    if (!studentData.suggested_activity) {
      return {
        image: "",
        name: "",
        description: ""
      };
    }
    return {
      image: "github",
      name: studentData.suggested_activity.name,
      description:
        "I am a static piece text. Bacon ipsum dolor amet pancetta short ribs pig shankle chicken. Kielbasa ribeye salami jerky ham hock short ribs."
    };
  }
  return state;
};

export default connect(mapStateToProps)(ActivityCard);
