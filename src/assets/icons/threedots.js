import React from 'react';
import styled from 'styled-components';

const ThreeDots = styled.div`

`

export default ({ color, width, height }) => (
    <ThreeDots>
        <svg viewBox="0 0 330 330" width={width} height={height}>
        <path fill={color || '#111111'}
            id="XMLID_22_" 
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M85,190
            c-13.785,0-25-11.215-25-25s11.215-25,25-25s25,11.215,25,25S98.785,190,85,190z M165,190c-13.785,0-25-11.215-25-25
            s11.215-25,25-25s25,11.215,25,25S178.785,190,165,190z M245,190c-13.785,0-25-11.215-25-25s11.215-25,25-25
            c13.785,0,25,11.215,25,25S258.785,190,245,190z"/>
        </svg>
    </ThreeDots>
);
