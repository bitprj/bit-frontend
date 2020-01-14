import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const GradingArea = styled.div`
    padding: 2rem;
`

class Submission extends Component {
    constructor(props) {
        super();
        this.state = {
            submission: props.submission
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.submission !== prevProps.submission) {
            this.setState({ submission: this.props.submission });
        }
    }

    render() {
        const checkpoints = (this.state.submission) ?
            this.state.submission.checkpoints.map((checkpoint, index) => {
                return (
                    <Fragment>
                        <strong>Checkpoint #1</strong>
                        <div>checkpoint.description here</div>

                        {checkpoint.image ?
                            <img src={checkpoint.image} alt='some alt'
                                width='200px'
                            />
                            : null
                        }

                        {checkpoint.video ?
                            <iframe src={checkpoint.video} alt='some alt'
                                width='500px'></iframe>
                            : null
                        }

                        <form noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Comment" />
                        </form>
                    </Fragment>
                )
            })
            : null;

        return (
            <GradingArea>
                <video ref="vidRef" src="https://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"></video>
                {checkpoints}
            </GradingArea>
        )
    }
}

export default Submission;
