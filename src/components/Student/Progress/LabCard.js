import React from 'react';
import styled from 'styled-components';

import BrickWall from '../../../assets/icons/brickwall'
import GitHub from '../../../assets/icons/github'

import StatusIcon from '../../shared/StatusIcon'

const RenderedCard = styled.div`
    background-color: #172A45;
    color: #fff;
    border-radius: 0.5em;
    padding: 2em 2em 4em;
    margin: 0.5em;
    min-width: 300px;
    max-width: 300px;
    flex: 1;
    position: relative;
    min-height: 15em;

    @media screen and (max-width: 1199px) {
        min-width: 200px;
    }

    @media screen and (max-width: 1000px) {
        max-width: 200px;
        min-width: 150px;
    }
    
    @media screen and (max-width: 657px) {
        font-size: 125%;
    }
`

const IconWrapper = styled.div`
    margin: 10% 0;
`

const Name = styled.h3``

const Description = styled.p`
    font-size: 80%;
    padding: 0 10%;
`

const StatusWrapper = styled.div`
    position: absolute;
    margin: 0 auto 1em;
    left: 0;
    right: 0;
    bottom: 0;
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
                {renderAppropriateImage(props.image, "3em")}
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
