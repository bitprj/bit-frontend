import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`

`

export default ({ color, width, height }) => (
    <Circle>
        <svg viewBox="0 0 2 2" width={width} height={height}>
            <circle
                fill={color || '#111111'}
                cx="1" cy="1" r="1"
            />
        </svg>
    </Circle>
);
