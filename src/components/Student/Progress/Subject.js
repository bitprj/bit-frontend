import React from 'react'
import styled from 'styled-components'

const RenderSubject = styled.div`
`

const Title = styled.h1`
    margin-bottom: 0.5rem;
`

const Subtitle = styled.h3`
    margin: 0;
`

const Description = styled.p`
    margin: 0.5rem 0 3rem;
    width: 70%;
`

const ProgressBar = styled.div`
    width: 95%;
    height: 1rem;
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
        line-height: 1rem;
        position: absolute;
        top: 0;
        bottom: 0;
        right: -5%;
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
            <ProgressBar progress={props.sectionProgress} />
        </RenderSubject>
    )
}

export default Subject
