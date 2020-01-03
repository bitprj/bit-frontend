import React from 'react';
import styled from 'styled-components';

import AtomIcon from '../../../assets/icons/atom';

const RenderSelectTopic = styled.div`
    padding: 6rem 7rem;
    background-color: #205791;
    color: #fff;
    text-align: center;
    border-radius: 0.5rem;
`

const AtomWrapper = styled.div`
    transform: scale(-1, 1);
`

const Name = styled.h1`

`

const Description = styled.p`
    font-size: 1.5rem;
    padding: 0 6rem;
`

const SelectTopic = props => {
    return (
        <RenderSelectTopic>
            <AtomWrapper>
                <AtomIcon color="#fff" width="10rem" />
            </AtomWrapper>
            <Name>Select a Topic to Explore</Name>
            <Description>
                There are countless areas of computer science, ready to be explored!
            </Description>
        </RenderSelectTopic>
    )
}

export default SelectTopic;
