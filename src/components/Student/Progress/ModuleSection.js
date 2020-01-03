import React from 'react';
import styled from 'styled-components';

import Card from './LabCard';
import StatusIcon from '../../shared/StatusIcon';

const RenderModuleSection = styled.div`
    margin: 2.5rem auto;
    padding: 0 5rem;
    padding-bottom: 2rem;
    width: 40rem;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #ccc;
        height: 95%;
        width: 0.2rem;
    }
`

const SectionName = styled.h2`
`

const SectionStatusWrapper = styled.div`
    position: absolute;
    left: -1rem;
`

const SectionDescription = styled.p`
`

const ModuleLayout = styled.div`
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1rem;
    text-align: center;
`

const ModuleSection = props => {
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
                <Card
                    name="Programming Principles"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua."
                    status={props.moduleStatuses[0].status}
                />
                <Card
                    name="Intro to Python"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua."
                    status={props.moduleStatuses[1].status}
                />
                <Card
                    name="OOP"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua."
                    status={props.moduleStatuses[2].status}
                />
                <Card
                    name="Data Structures"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua."
                    status={props.moduleStatuses[3].status}
                />
            </ModuleLayout>
        </RenderModuleSection>
    )    
}

export default ModuleSection
