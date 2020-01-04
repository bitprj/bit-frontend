import React from 'react'
import styled from 'styled-components';

import Card from './LabCard'
import StatusIcon from '../../shared/StatusIcon'

const RenderModuleSection = styled.div`
    margin: 2.5em auto;
    padding: 0 10%;
    padding-bottom: 4.20%;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 1.05em;
        background-color: #ccc;
        height: calc(100% - 4.20em);
        width: 0.2em;
    }
`

const SectionName = styled.h2`
    @media screen and (max-width: 420px) {
        padding-left: 0.8em;
    }
`

const SectionStatusWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

const SectionDescription = styled.p`
    @media screen and (max-width: 420px) {
        padding-left: 0.8em;
    }
`

const ModuleLayout = styled.div`
    margin-top: 1.5em;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    text-align: center;
`

const ModuleSection = props => {

    const moduleCards = props.moduleContents.map((moduleContent, index) => {
        return <Card
            key={moduleContent._id}
            name={moduleContent.name}
            image={moduleContent.image}
            description={moduleContent.description}
            status={moduleContent.status}
        />
    })

    return (
        <RenderModuleSection>
            <SectionStatusWrapper>
                <StatusIcon type={props.sectionStatus} />
            </SectionStatusWrapper>
            <SectionName>Art of Programming</SectionName>
            <SectionDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur.
            </SectionDescription>

            <ModuleLayout>
                {moduleCards}
            </ModuleLayout>
        </RenderModuleSection>
    )    
}

export default ModuleSection
