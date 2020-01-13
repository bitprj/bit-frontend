import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const EntryWrapper = styled.div`
    padding: 15px 10px;
    border-bottom: 1.5px solid lightgrey;
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
    <EntryWrapper>
        <Grid container spacing={0}>
            <Grid item xs={1}>
                {/* {props.status} */}
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
