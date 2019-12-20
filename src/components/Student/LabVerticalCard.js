import React from 'react';
import styled from 'styled-components';
import Button from '../Button';


const NavyCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
    padding: 44px 32px;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: #232323;
    text-align: center;
    width: 325px;
`
const ContainDescription = styled.p`
    max-width: 80%;
    text-align: center;
    position: relative;
`

const LabVerticalCard = (props) => {
    return (
        <NavyCard>
            <img class="img-center" alt="labLogo" src={props.labIcon} height="64" width="64" />
            <h2>{props.labTitle}</h2>
            <ContainDescription>{props.labDescription}</ContainDescription>
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