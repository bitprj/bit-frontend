import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Concept from './Concept';

class ConceptModal extends React.Component {
    state = {
        open: true,
    }

    modalOpenedHandler = () => {
        this.setState({
            open: true
        })
    };

    modalClosedHandler = () => {
        this.setState({
            open: false
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props.conceptID !== prevProps.conceptID) {
            this.setState({
                open: true
            })
        }
    }

    render() {
        return (
            <div>
                <button gems={this.props.gems} onClick={this.modalOpenedHandler}>Concept</button>

                <Modal
                    className='modal'
                    open={this.state.open}
                    onClose={this.modalClosedHandler}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 200,
                    }}>

                    <Fade in={this.state.open}>
                        <Concept conceptID={this.props.conceptID} />
                    </Fade>
                </Modal>

                <style jsx>{`
                    .modal {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}</style>
            </div >
        );
    }
}

export default ConceptModal;

