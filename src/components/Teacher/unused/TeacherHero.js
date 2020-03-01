import React from 'react';
import styled from 'styled-components';

const Hero = styled.div`
    background-color: #0b1330;
    color: white;
    margin: 0 -8px;
    padding: 40px 40px 10px 40px;
`

const MainArea = styled.div`
    display: flex;
`

const StatusSquare = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 1.5rem;
    box-shadow: 0 4px 30px 0 #ff6726;
    background-color: #ff6726;
`

const SubmittedSquare = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    background-color: #007bed;
    margin: 0 0 0 5px;
    padding: 4px;
    text-align: center;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
`

const SubmittedBar = styled.div`
    margin-top: 40px;
`

const TeacherHero = (props) => {
    return (
        <Hero>
            <MainArea>
                <StatusSquare />
                <div>
                    <Title>Grade Assignments</Title>
                    <div>{props.pending} assignments pending</div>
                </div>
            </MainArea>

            <SubmittedBar>
                Submitted Assignments
                <SubmittedSquare><strong>{props.submitted}</strong></SubmittedSquare>
            </SubmittedBar>
        </Hero >
    )
}

export default TeacherHero;
