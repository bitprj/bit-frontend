import React from "react";
import styled from "styled-components";
import media from "../global/media";

const FontSize = styled.div`
  font-size: 32px;
  ${media.massive`font-size: 28px;`};
  ${media.thicc`font-size: 24px;`};
  ${media.giant`font-size: 20px;`};
  ${media.bigDesktop`font-size: 17.5px;`};
  ${media.desktop`font-size: 15.5px;`};
  ${media.tablet`font-size: 14px;`};
  ${media.phablet`font-size: 13.1px;`};
  ${media.phone`font-size: 13px;`};
`;

const FontSizeHandler = props => {
  return (
    <FontSize>
      {props.children}
    </FontSize>
  )
};

export default FontSizeHandler;
