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
    const [result, setResult] = React.useState({});
    const [currentSlide, setSlide] = React.useState('upload');

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const switchToResult = () => {
        setSlide('checkpoint');
    }

    const switchToUpload = () => {
        setSlide('upload');
    }

    const fillResult = (result) => {
        setResult(result);
    }

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
                    timeout: 500,
                }}>

                <Fade in={open}>
                    {currentSlide === 'upload' ?
                        <Upload closeModal={closeModal} fillResult={fillResult} switchToResult={switchToResult} />
                        : <Result closeModal={closeModal} result={result} switchToUpload={switchToUpload} />
                    }
                </Fade>
            </Modal>
        </div>
    );
}

export default CheckpointModal;
