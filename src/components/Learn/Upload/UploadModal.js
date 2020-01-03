import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Upload from './Upload';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const UploadModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const modalOpenedHandler = () => {
        setOpen(true);
    };

    const modalClosedHandler = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={modalOpenedHandler}>Upload</button>

            <Modal
                className={classes.modal}
                open={open}
                onClose={modalClosedHandler}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}>

                <Fade in={open}>
                    <Upload />
                </Fade>
            </Modal>
        </div>
    );
}

export default UploadModal;