import React from 'react';
import styled from 'styled-components';

import Button from '../shared/Button';

const NavyCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: #0b1354;
    text-align: center;
`

const LabVerticalCard = (props) => {
    return (
        <NavyCard>
            <img class="img-center" alt="labLogo" src={props.labIcon} height="64" width="64" />
            <h2>{props.labTitle}</h2>
            <p>{props.labDescription}</p>
            <Button buttonState="Resume" class_name={props.buttonClass} clicked={() => props.buttonClicked} />

            <style jsx>{`
                .img-center {
                    margin-left: auto;
                    margin-right: auto;			
            `}</style>
        </NavyCard>
    )
}

export default LabVerticalCard;