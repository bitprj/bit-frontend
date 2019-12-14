import React from 'react';
import styled from 'styled-components';

const MenuBar = styled.div`
    margin-top: 20px;
    margin-right: 10rem;
`

const Navigation = (props) => {
    return (
        <MenuBar>
            <ul>
                {props.cardTitles.map(cardTitle => {
                    return <li>{cardTitle}</li>
                })}
            </ul>
        </MenuBar>
    )
}

export default Navigation;