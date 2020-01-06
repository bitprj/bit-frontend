import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const NotiBox = styled.div`
    padding: 15px 10px;
    border-bottom: 1.5px solid lightgrey;
`

const NotificationBox = props => (
    <NotiBox>
        <Grid container spacing={0}>
            <Grid item xs={2}>
                {props.status}
            </Grid>

            <Grid item xs>
                <strong>{props.labTitle}</strong>

                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        {props.studentName}
                    </Grid>
                    <Grid item xs>
                        {props.time}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    </NotiBox >
)

export default NotificationBox;
