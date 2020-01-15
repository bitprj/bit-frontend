import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Button from '../../shared/Button';

const GradingArea = styled.div`
    padding: 1.5rem;
`

const Checkpoint = styled.div`
    margin-bottom: 3rem;
`

const Title = styled.div`
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 1rem;
`

const Comment = styled.div`
    margin: 1rem 0;
`

class Submission extends Component {
    constructor(props) {
        super();
        this.state = {
            submission: props.submission
        }

        this.changeInput = this.changeInput.bind(this);
        this.submitGrading = this.submitGrading.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.submission !== prevProps.submission) {
            this.setState({ submission: this.props.submission });
        }
    }

    changeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitGrading = (event) => {
        event.preventDefault();
        // POST comments to backend
        alert('submit');
        console.log('comment', this.state);
    }

    render() {
        const checkpoints = (this.state.submission) ?
            this.state.submission.checkpoints.map((checkpoint, index) => {
                return (
                    <Checkpoint key={`checkpoint-${index}`}>
                        <Title>Checkpoint #{++index}</Title>
                        <p>Bacon ipsum dolor amet swine picanha pork porchetta landjaeger sirloin venison spare ribs drumstick chislic beef ribs cow. </p>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                {checkpoint.image ?
                                    <img src={checkpoint.image} alt={checkpoint.image}
                                        width='100%'
                                    />
                                    : null
                                }

                                {checkpoint.video ?
                                    <video type="video/mp4"
                                        src={checkpoint.video}
                                        width='100%'
                                        controls ></video>
                                    : null
                                }
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div>Bacon ipsum dolor amet swine picanha pork porchetta landjaeger sirloin venison spare ribs drumstick chislic beef ribs cow. Cupim pastrami doner tenderloin, ground round fatback jerky alcatra short ribs kevin ribeye corned beef. Tenderloin ham beef ribs corned beef turducken landjaeger, chuck kevin. Chislic jowl brisket meatloaf frankfurter boudin pastrami short ribs pork loin.</div>
                            </Grid>
                        </Grid>

                        <Comment>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="filled-multiline-static"
                                    name={`checkpoint-${index}-comment`}
                                    label="Comment"
                                    multiline
                                    rows="10"
                                    variant="filled"
                                    fullWidth
                                    onChange={this.changeInput} />
                            </form>
                        </Comment>
                    </Checkpoint>
                )
            })
            : null;

        return (
            <GradingArea>
                {checkpoints}
                <Button buttonState="Submit" class_name="button invert" click={this.submitGrading} />
            </GradingArea>
        )
    }
}

export default Submission;
