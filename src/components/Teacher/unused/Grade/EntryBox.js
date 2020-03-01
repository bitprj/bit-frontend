import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const EntryWrapper = styled.div`
    padding: 25px 10px;
    border-bottom: 1.5px solid lightgrey;
    transition: transform .2s;
    background: ${props => (props.index === props.current) ? 'rgba(0, 118, 255, 0.1)' : 'white'};

    &:hover {
        transform: translateX(1px);
        color: #0070f3;
        background: rgba(0, 118, 255, 0.1);
    }
`

const StudentName = styled.div`
    color: green;
    font-size: 14px;
`

const Time = styled.div`
    color: grey;
    font-size: 14px;
`

const EntryBox = props => (
    <EntryWrapper current={props.currentSubmission} index={props.index} onClick={() => props.switchSubmission(props.index)}>
        <Grid container spacing={0}>
            <Grid item xs={1}>
                o
            </Grid>

            <Grid item xs>
                <strong>{props.activityName}</strong>

                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <StudentName>{props.studentName}</StudentName>
                    </Grid>
                    <Grid item xs>
                        <Time>{props.time}</Time>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </EntryWrapper >
)

export default EntryBox;
