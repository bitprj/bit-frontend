import React from 'react';
import styled from 'styled-components';
import { Box, Grid } from 'grommet';

import GreetingSection from './GreetingSection';
import LabVerticalCard from './LabVerticalCard';

const Hero = styled.div`
    background-color: #0b1330;
    color: white;
    margin: 0 -8px;
`

const StudentHero = (props) => {

    return (
        <Hero align='stretch' pad={{ horizontal: 'large' }}>
            <Grid
                rows={['auto', 'auto']}
                columns={['auto', 'medium']}
                gap="small"
                areas={[
                    { name: 'greeting', start: [0, 0], end: [0, 1] },
                    { name: 'resume', start: [1, 0], end: [1, 1] },
                ]}
            >
                <Box gridArea="greeting">
                    <GreetingSection title={`Hello ${props.studentName} `}
                        subtitle="Welcome Back!" />
                </Box>
                <Box gridArea="resume" margin="20px 20px" alignContent="center">
                    <LabVerticalCard labIcon={props.labIcon}
                        labTitle={props.labTitle}
                        labDescription={props.labDescription}
                        buttonState="resume"
                        buttonClass="button invert"
                        buttonClicked={() => props.resumeClicked} />
                </Box>
            </Grid>
        </Hero>
    )
}

export default StudentHero;