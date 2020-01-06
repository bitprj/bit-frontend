import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import GreetingSection from './GreetingSection';
import LabVerticalCard from './LabVerticalCard';

const Hero = styled.div`
    background-color: #0b1330;
    color: white;
    margin: 0 -8px;
    padding: 40px;
`

const StudentHero = (props) => {
    return (
        <Hero>
            <Grid container spacing={0}>
                <Grid item xs>
                    <GreetingSection title={`Hello ${props.studentName} `}
                        subtitle="Welcome Back!" />
                </Grid>

                <Grid item xs={5}>
                    <LabVerticalCard labIcon={props.labIcon}
                        labTitle={props.labTitle}
                        labDescription={props.labDescription}
                        buttonState="resume"
                        buttonClass="button invert"
                        buttonClicked={() => props.resumeClicked} />
                </Grid>
            </Grid>
        </Hero>
    )
}

export default StudentHero;
