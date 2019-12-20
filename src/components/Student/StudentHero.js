import React from 'react';
import styled from 'styled-components';
import { Box, Grid } from 'grommet';

import Button from '../Button';
import Card from '../Card';

const Hero = styled.div`
    background-color: #0b1330;
    color: white;
`

const ResumeContent = styled.div`
    text-align: center;
    margin: 3rem auto;
`

const StudentHero = (props) => {
    const content = (<ResumeContent>
        <img alt="labLogo" src={props.labIcon} height="64" width="64" />
        <h2>{props.labTitle}</h2>
        <p>{props.labDescription}</p>
        <Button name="Resume" class_name="button invert" clicked={() => props.resumeClicked} />
    </ResumeContent>)

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
                    <div className="greeting-area">
                        <h1>Hello, {props.studentName}</h1>
                        <h3>Welcome Back!</h3>
                    </div>
                </Box>
                <Box gridArea="resume" margin="20px 20px" alignContent="center">
                    <Card content={content} />
                </Box>
            </Grid>

            <style jsx>{`
                .greeting-area {
                    margin: auto 0 auto 20%;
			`}</style>
        </Hero>
    )
}

export default StudentHero;