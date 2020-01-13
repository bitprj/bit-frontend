import React from "react";
import styled from "styled-components";

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
  return (
    <>
      <Load>
        <CircularProgress
          variant="static"
          thickness={5}
          style={{color: props.color}}
          size={props.size}
          value={props.value}
        />
      </Load>

      <Back>
        <CircularProgress
          variant="static"
          thickness={5}
          style={{ color: "#ebebeb" }}
          size={props.size}
          value={100}
        />
      </Back>
    </>
  );
};

export default ProgressCircle;
