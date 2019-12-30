import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Concept from './Concept';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const ConceptModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const modalOpenedHandler = () => {
        setOpen(true);
    };

    const modalClosedHandler = () => {
        setOpen(false);
    };

    const imgCenter = {
        display: 'block',
        margin: '3rem auto',
        width: '50%'
    }

    return (
        <div>
            <button gems={props.gems} onClick={modalOpenedHandler}>Concept</button>

            <Modal
                // aria-labelledby="transition-modal-title"
                // aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={modalClosedHandler}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}>

                <Fade in={open}>
                    <Concept>
                        {/* <h2 id="transition-modal-title">Unlock a Hint</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p> */}


                    </Concept>
                </Fade>
            </Modal>
        </div>
    );
}

export default ConceptModal;