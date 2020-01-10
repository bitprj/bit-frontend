import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "0 10%"
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "5px",
    padding: "0",
    width: "100%",
    height: "75%",
    outline: 0
  }
}));

const FinalProject = props => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.closed}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.open}>
        <div className={classes.content}>
          <h2 id="transition-modal-title">Choose Final Project</h2>
          <p id="transition-modal-description">
            Choose a Project to practice your newfound knowledge in Programming Principles, GitHub, Command Lines, and other things.
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

export default FinalProject;
