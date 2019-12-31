import React from 'react';
import styled from 'styled-components';

const RenderedGemBox = styled.div`
    display: block;
    text-align: center;
    border-radius: 30px;
    padding: .2rem .6rem;
    background-color: white;
    color: black;
    width: 60px;
    float: right;
    vertical-align: middle;
    transition: background .2s ease, color .2s ease, box-shadow .2s ease, opacity .2s ease;
    &:hover {
        background-color: #F0F8FF;
    }
`

const GemBox = (props) => (
    <RenderedGemBox>
        <div onClick={props.click}>
            <span role="img" aria-label="Total Gems">💎</span>
            {props.gems}
        </div>
    </RenderedGemBox>
)

export default GemBox;