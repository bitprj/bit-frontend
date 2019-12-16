import React from 'react';
import styled from 'styled-components';

const MenuBar = styled.div`
    margin-top: 20px;
    width: 500px;
`

const Navigation = (props) => {
    return (
        <MenuBar>
            <ul>
                {props.cardTitles.map(cardTitle => {
                    return <li key={cardTitle}>{cardTitle}</li>
                })}
            </ul>
        </MenuBar>
    )
}

export default Navigation;
