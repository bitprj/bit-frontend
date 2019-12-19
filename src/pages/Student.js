import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Grid, Grommet } from 'grommet';

import Button from '../components/Button';
import Card from '../components/Learning/Card';

const Hero = styled.div`
    // position: relative;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    // padding: 1rem;
    // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    // overflow: hidden;
    // margin: 0 -10px 0 -10px;
    background-color: #0b1330;
    color: white;
`

const ResumeContent = styled.div`
    text-align: center;
    margin: 3rem;
`

class Student extends Component {
    constructor() {
        super();
        this.state = {
            studentName: "Moomin Azkaban",
            currentLab: {
                labIcon: "https://maxcdn.icons8.com/Share/icon/p1em/Logos/github1600.png",
                labTitle: "Intro to Github",
                labSummary: "Bacon ipsum dolor amet pancetta short ribs pig shankle chicken. Kielbasa ribeye salami jerky ham hock short ribs pork belly boudin filet mignon ham, ball tip beef ribs turducken."
            }
        }
    }

    resumeClickedHandler() {
        // go to current lab
    }

    render() {
        const content = (<ResumeContent>
            <img alt="labLogo" src={this.state.currentLab.labIcon} height="64" width="64" />
            <h2>{this.state.currentLab.labTitle}</h2>
            <p>{this.state.currentLab.labSummary}</p>
            <Button name="Resume" class_name="button invert" clicked={() => this.resumeClickedHandler()} />
        </ResumeContent>)

        return (
            <div>
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
                                <h1>Hello, {this.state.studentName}</h1>
                                <h3>Welcome Back!</h3>
                            </div>
                        </Box>
                        <Box gridArea="resume" margin="20px 20px" alignSelf="center">
                            <Card content={content} />
                        </Box>
                    </Grid>
                </Hero>

                <style jsx>{`
					.greeting-area {
						margin: auto 0 auto 20%;
				`}</style>
            </div >
        )
    }
}

export default Student;