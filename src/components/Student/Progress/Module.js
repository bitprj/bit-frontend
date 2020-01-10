import React from "react";
import styled from "styled-components";
import FinalProjectModal from "./FinalProject";

const RenderedModal = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;

const Content = styled.div`
  background-color: #fff;
  border: 2px solid #000;
  // box-shadow: theme.shadows[5];
  padding: 20px;
`;

const Module = props => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Select Final Project
      </button>
      <FinalProjectModal open={open} closed={handleClose} />
    </>
  );
};

export default Module;
