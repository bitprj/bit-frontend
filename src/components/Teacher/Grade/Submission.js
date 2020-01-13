import React, { Component } from 'react';
import styled from 'styled-components';

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
            this.state.submission.checkpoints.map(checkpoint => {
                return (
                    <h1>{checkpoint.type}</h1>
                )
            })
            : null;

        return (
            <GradingArea>
                {checkpoints}
            </GradingArea>
        )
    }
}

export default Submission;
