import React from "react";
import styled from "styled-components";

import CheckIcon from "../../assets/icons/check";

const RenderedButton = styled.div`
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  padding: 0.5em 1em;
  margin: 1em 0.5em;
  border-radius: 7px;
  color: #0070f3;
  background-color: transparent;
  border: none;
  font-size: inherit;
  line-height: inherit;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
  border: 1px solid transparent;

  &:hover {
    color: #0070f3;
    background: rgba(0, 118, 255, 0.1);
  }

  &.invert {
    border-radius: 7px;
    background-color: #0070f3;
    box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
    color: white;
  }

  &.invert:hover {
    background: rgba(0, 118, 255, 0.9);
    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.23);
  }

  &.invert:active {
    background: #006ae6;
  }

  &.outline {
    border: 1px #0070f3 solid;
  }

  &.less-round {
    border-radius: 3.5px;
  }
`;

const Button = props => {
  switch (props.buttonState) {
    case "Check":
      return <CheckIcon color="#2BDB66" check_width="32" check_height="32" />;
    case "NextHint":
      return (
        <RenderedButton
          className={props.class_name}
          onClick={() => props.click(props.index)}
        >
          >
        </RenderedButton>
      );
    case "PrevCard":
      const prev = "< Prev";
      return (
        <RenderedButton
          className={props.class_name}
          onClick={() => props.moveToPrev(-1)}
        >
          {prev}
        </RenderedButton>
      );
    case "NextCard":
      return (
        <RenderedButton
          className={props.class_name}
          onClick={() => props.moveToNext(1)}
        >
          Next >
        </RenderedButton>
      );
    case "":
      return true;

    default:
      return (
        <RenderedButton className={props.class_name} onClick={props.click} style={props.style}>
          {props.buttonState}
        </RenderedButton>
      );
  }
};

export default Button;
