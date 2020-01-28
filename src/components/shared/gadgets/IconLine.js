import React from "react";
import styled from "styled-components";

const Container = styled.span`
  line-height: 1em;
`;

const IconWrapper = styled.div`
  margin-right: ${props => props.marginRight || "0.2em"};
  display: inline-flex;
  align-self: center;

  > svg,
  > img {
    width: 1em;
    height: 1em;
    top: 0.125em;
    position: relative;
    font-size: inherit;
  }
`;

const IconLine = props => {
  return (
    <Container>
      <IconWrapper marginRight={props.marginRight}>{props.icon}</IconWrapper>
      <span>{props.children}</span>
    </Container>
  );
};

export default IconLine;
