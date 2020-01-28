import React from "react";
import styled from "styled-components";

const RenderedButton = styled.button.attrs(props => ({
  accent: props.theme.accent
}))`
  display: inline-block; 
  margin: ${props => props.margin || (props.fullWidth ? "" : "0.5em")};
  padding: ${props => props.padding || "0.75em 1.5em"};
  ${props => (props.width ? `width: ${props.width};` : "")}
  ${props => (props.fullWidth ? "width: 100%;" : "")}
  ${props =>
    props.rounder ? "border-radius: 0.5em;" : "border-radius: 0.25em;"}
  ${props => (props.sharp ? "border-radius: 0;" : "")}
  border: ${props => props.dark || props.accent} solid 0.1em;
  ${props =>
    props.invert
      ? `
      background-color: ${props.dark || props.accent}};
      color: ${props.light || "#fff"};
      box-shadow: 0 4px 14px 0 ${props.dark || props.accent}77;`
      : `
      background-color: ${props.light || "transparent"};
      color: ${props.dark || props.accent};`}

  text-align: center;
  outline: none;
  white-space: nowrap;
  transition: 0.2s ease all;
  font-size: inherit;

  &:hover {
    ${props =>
      props.invert
        ? "filter: brightness(110%);"
        : `box-shadow: inset 0 0 100em 100em ${
            props.dark
              ? props.dark.length === 4
                ? props.dark + "1"
                : props.dark + "16"
              : props.accent + "16"
          }`}
  }

  &:active {
    ${props =>
      props.invert
        ? "filter: brightness(120%);"
        : `box-shadow: inset 0 0 100em 100em ${
            props.dark
              ? props.dark.length === 4
                ? props.dark + "3"
                : props.dark + "32"
              : props.accent + "32"
          }`}
  }
`;

/**
 * THICC BUTTON
 *
 * limitations: does not have logic for semi-transparent button (hover and active will break)
 * @param {*} props
 */
const Button = props => {
  return (
    <RenderedButton
      dark={props.dark}
      light={props.light}
      invert={props.invert}
      fullWidth={props.fullWidth}
      rounder={props.rounder}

      sharp={props.sharp}
      width={props.width}
      margin={props.margin}
      padding={props.padding}
      
      onClick={props.clicked}
    >
      <span>{props.children}</span>
    </RenderedButton>
  );
};

export default Button;
