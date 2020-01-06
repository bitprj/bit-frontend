import React from 'react';
import styled from 'styled-components';

import AtomIcon from '../../../assets/icons/atom';

const RenderSelectTopic = styled.div`
    padding: 3em 10%;
    background-color: #205791;
    color: #fff;
    text-align: center;
    border-radius: 0.5em;
`

const AtomWrapper = styled.div`
    transform: scale(-1, 1);
    margin: 1em 0;
`

const Name = styled.h1`
    margin: 0 0;
`

const Description = styled.p`
    font-size: 1.5em;
    padding: 0 5%;
`

const SelectTopic = props => {
    return (
        <RenderSelectTopic>
            <AtomWrapper>
                <AtomIcon color="#fff" width="8em" />
            </AtomWrapper>
            <Name>Select a Topic to Explore</Name>
            <Description>
                There are countless areas of computer science, ready to be explored!
            </Description>
        </RenderSelectTopic>
    )
}

export default SelectTopic;
