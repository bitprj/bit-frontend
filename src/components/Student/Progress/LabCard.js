import React from 'react';
import styled from 'styled-components';

import BrickWall from '../../../assets/icons/brickwall'
import GitHub from '../../../assets/icons/github'

import StatusIcon from '../../shared/StatusIcon'

const RenderedCard = styled.div`
    background-color: #172A45;
    color: #fff;
    border-radius: 0.5rem;
    padding: 1.25rem;
`

const IconWrapper = styled.div`
    margin: 2.5rem 0.625rem;
`

const Name = styled.h3`
    font-size: 1.4rem;
`

const Description = styled.p`
    font-size: 1rem;
    padding: 0 3.125rem;
`

const StatusWrapper = styled.div`
    margin-top: 2rem;
`

const LabCard = props => {

    const renderAppropriateImage = (imageName, width, height) => {
        switch (imageName) {
            case 'brickwall':
                return <BrickWall color="#FFF" width={width} height={height}/>
    
            case 'github': 
                return <GitHub color="#FFF" width={width} height={height}/>
    
            default:
                return null
        }
    }

    return (
        <RenderedCard className={props.class_name}>
            <IconWrapper>
                {renderAppropriateImage(props.image, "3rem")}
            </IconWrapper>
            <Name>{props.name}</Name>
            <Description>{props.description}</Description>
            <StatusWrapper>
                <StatusIcon type={props.status}/>
            </StatusWrapper>
        </RenderedCard>
    );
}

export default LabCard
