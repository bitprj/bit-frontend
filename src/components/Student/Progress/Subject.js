import React from 'react'
import styled from 'styled-components'

const RenderSubject = styled.div`
`

const Title = styled.h1`
    margin-top: 0;
    margin-bottom: 0.3em;
`

const Subtitle = styled.h3`
    margin: 0;
`

const Description = styled.p`
    margin: 0.5em 0 2em;
    width: 75%;
`

const ProgressBar = styled.div`
    width: 93%;
    height: 1em;
    background-color: #eee;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: ${props => props.progress};
        background-color: #4788ff;
    }

    &:after {
        content: '${props => props.progress}';
        line-height: 1em;
        position: absolute;
        top: 0;
        bottom: 0;
        right: -3em;
    }

    @media only screen and (max-width: 555px) {
        width: 90%;
    }
`

const Subject = props => {
    return (
        <RenderSubject>
            <Title>Computer Science</Title>
            <Subtitle>with emphasis in React.js</Subtitle>
            <Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum.
            </Description>
            <ProgressBar progress={props.sectionProgress}/>
        </RenderSubject>
    )
}

export default Subject
