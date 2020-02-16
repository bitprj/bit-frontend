import React from "react";
import styled from "styled-components";

import ImgAndContent from "../../shared/gadgets/ImgAndContent";

const Sparkles = styled.div`
  padding: 0.5em 0.7em;
  position: absolute;
  bottom: 0.5em;
  left: 4em;
  transform: translateX(-50%);

  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  border-radius: 1em;
  line-height: 0.8em;
  background-color: #fff;
  font-size: 125%;
  text-align: center;
  white-space: nowrap;
`;

const Project = props => {
  return (
    <ImgAndContent
      imgWidthEms="7"
      imgURL={props.imgURL}
      title={props.name}
      description={props.description}
      time={props.time}
      hover
      shadow
      clicked={props.clicked}
    >
      <Sparkles>
        <span role="img" aria-label="sparkles">
          ✨
        </span>
        40
      </Sparkles>
    </ImgAndContent>
  );
};

export default Project;
