import React from 'react';
import styled from 'styled-components';

const RenderedCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
`

const Card = (props) => {
    return (
        <RenderedCard>
            {props.content}
        </RenderedCard>
    )
}

export default Card;