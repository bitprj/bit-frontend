import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Upload from './Upload';
import Result from './Result';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const CheckpointModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Checkpoint</button>

            <Modal
                className={classes.modal}
                open={open}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}>

                <Fade in={open}>
                    <Upload closeModal={closeModal} />
                    {/* <Result closeModal={closeModal} /> */}
                </Fade>
            </Modal>
        </div>
    );
}

export default CheckpointModal;
