import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import EntryBox from './Grade/EntryBox';
import Submission from './Grade/Submission';

import TeacherService from '../../../services/TeacherService';

const data = [
    {
        "id": 31,
        "studentName": "S. Gupta",
        "activityName": "Intro to Command Line",
        "checkpoints": [
            {
                "id": 38,
                "is_completed": true,
                "image": "https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Image%20from%20iOS.jpg",
                "video": null,
                "type": "Image"
            },
            {
                "id": 39,
                "is_completed": true,
                "image": null,
                "video": 'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Snow%20Falling%20Down.mp4',
                "type": "Image"
            },
            {
                "id": 40,
                "is_completed": true,
                "image": null,
                "video": 'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Snow%20Falling%20Down.mp4',
                "type": "Video"
            }
        ]
    },
    {
        "id": 29,
        "studentName": "K. Denial",
        "activityName": "Cava",
        "checkpoints": [
            {
                "id": 14,
                "is_completed": true,
                "image": null,
                "video": "https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Snow%20Falling%20Down.mp4",
                "type": "Video"
            },
            {
                "id": 12,
                "is_completed": true,
                "image": "https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Image%20from%20iOS.jpg",
                "video": null,
                "type": "Image"
            },
            {
                "id": 13,
                "is_completed": true,
                "image": "https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Image%20from%20iOS.jpg",
                "video": null,
                "type": "Image"
            }
        ]
    }
]

const EntrySection = styled.div`
    margin-left: -8px;
`

class TeacherContent extends Component {
    constructor(props) {
        super();
        this.state = {
            classroomID: 1,
            submissions: [],
            currentSubmission: 0
        }

        this.switchSubmission = this.switchSubmission.bind(this);
        this.service = new TeacherService();
    }

    componentDidMount() {
        this.service.getSubmissions(this.state.classroomID)
            .then(data => console.log('data here', data));

        this.setState({ submissions: data });
    }

    switchSubmission = (index) => {
        this.setState({ currentSubmission: index });
    }

    render() {
        const entries = this.state.submissions.map((submission, index) => {
            return <EntryBox key={`entry-${index}`}
                studentName={submission.studentName}
                activityName={submission.activityName}
                time={'2 min ago'}
                index={index}
                currentSubmission={this.state.currentSubmission}
                switchSubmission={this.switchSubmission} />
        });

        const submission = this.state.submissions[this.state.currentSubmission];

        return (
            <Grid container spacing={0} >
                <Grid item xs={3}>
                    <EntrySection>
                        {entries}
                    </EntrySection>
                </Grid>

                <Grid item xs={9}>
                    <Submission classroomID={this.state.classroomID} submission={submission} />
                </Grid>
            </Grid>
        )
    }
}

export default TeacherContent;
