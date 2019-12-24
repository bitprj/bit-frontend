import React from 'react';
import styled from 'styled-components';

const RenderedGemBox = styled.div`
    display: block;
    text-align: center;
    border-radius: 30px;
    padding: .2rem .6rem;
    background-color: salmon;
    float: right;
    transition: background .2s ease, color .2s ease, box-shadow .2s ease, opacity .2s ease;
    &:hover {
        background-color: rgb(242, 104, 100);
    }
`

const GemBox = (props) => (
    <RenderedGemBox>
        <span role="img" aria-label="Total Gems">💎</span>{props.gems}
    </RenderedGemBox>
)

export default GemBox;