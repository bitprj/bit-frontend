import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import NotificationSection from '../Teacher/NotificationSection';

class TeacherContent extends Component {
    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <NotificationSection />
                </Grid>

                <Grid item xs>
                    World
                </Grid>
            </Grid>
        )
    }
}

export default TeacherContent;
