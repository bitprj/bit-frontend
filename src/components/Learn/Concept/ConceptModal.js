import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Concept from './Concept';

class ConceptModal extends React.Component {
    state = {
        open: true
    }

    setOpen = (value) => {
        this.setState({
            open: value
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.conceptID !== prevProps.conceptID) {
            this.setOpen(true);
        }
    }

    render() {
        return (
            <div>
                <button gems={this.props.gems} onClick={() => this.setOpen(true)}>Concept</button>

                <Modal className='modal'
                    open={this.state.open}
                    onClose={() => this.setOpen(false)}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 200, }} >

                    <Fade in={this.state.open}>
                        <Concept conceptID={this.props.conceptID} closeModal={this.setOpen.bind(this)} />
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

