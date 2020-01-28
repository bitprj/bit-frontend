import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";

const Load = styled.div`
  position: absolute;
  z-index: 99;
`;

const Back = styled.div`
  position: absolute;
  z-index: 98;
`;

const ProgressCircle = props => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <Load>
        <CircularProgress
          variant="static"
          thickness={5}
          style={{ color: themeContext.accent }}
          size={props.size}
          value={props.value}
        />
      </Load>

      <Back>
        <CircularProgress
          variant="static"
          thickness={5}
          style={{ color: themeContext.offFont }}
          size={props.size}
          value={100}
        />
      </Back>
    </>
  );
};

export default ProgressCircle;
