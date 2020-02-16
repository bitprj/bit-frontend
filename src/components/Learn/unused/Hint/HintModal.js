import React, { Fragment } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '../../../shared/unused/Button';
import GemBox from '../../../shared/GemBox';

const ModalCard = styled.div`
    padding: .3rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    min-height: 300px;
    min-width: 500px;
    text-align: center;
    background-color: white;
`

const FloatRight = styled.div`
    float: right;
`

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const HintModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const modalOpenedHandler = () => {
        setOpen(true);
    };

    const modalClosedHandler = () => {
        setOpen(false);
    };

    const unlockAndCloseHandler = () => {
        props.unlockHint();
        setOpen(false);
    }

    const img_center = {
        display: 'block',
        margin: '3rem auto',
        width: '50%'
    }

    return (
        <Fragment>
            <FloatRight>
                <GemBox gems={props.gems} type={'Hint'} click={modalOpenedHandler} />
            </FloatRight>

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
                    <ModalCard>
                        {/* <h2 id="transition-modal-title">Unlock a Hint</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p> */}

                        <h2>Unlock a Hint</h2>
                        <p>Are you sure you want to spend <br></br>
                            <strong>{props.gems} Gems</strong> to unlock this hint?
                        </p>

                        <img alt='some alt here' style={img_center} src='https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/f/fb/Cielaph.png/302px-Cielaph.png?version=11c2e049da27d8f6e1c0a758077857c3' />

                        <Button buttonState="< Cancel" class_name="button" click={modalClosedHandler} />
                        <Button buttonState="Unlock" class_name="button invert" click={unlockAndCloseHandler} />
                    </ModalCard>
                </Fade>
            </Modal>
        </Fragment>
    );
}

export default HintModal;
