import React from 'react';
import styled from 'styled-components';

import CheckIcon from '../../../assets/icons/check';
import GemBox from '../../shared/GemBox';

const Course = styled.div`
    margin: 0 0 0 5%;
    padding: 50px 0 40px 0;
    // border-left: 1px solid rgb(239, 239, 239);
`

const NavSection = styled.div`
    color: white;
    padding: 3rem 1rem;
`

const CardTitle = styled.div`
    font-weight: bold;
    font-size: 20px;
`

const TitleItem = styled.div`
    margin: 5px 0;
`

const LabTitle = styled.div`
    font-size: 14px;
`

const icon_style = {
    margin: '-8px',
    height: '15px',
}

const Navigation = (props) => {
    const currentCardTitle = props.cardTitles[props.currentCard];

    const steps = props.cardTitles.map((cardTitle, index) => {
        const selected = (index === props.currentCard) ? "selected" : null;
        const check = <CheckIcon color="#2BDB66" check_width="16" check_height="16" icon_style={icon_style} />;
        const dot = <span className="dot"></span>;
        const icon = (index < props.lastCardUnlocked) ? check : dot;

        return (
            <TitleItem key={cardTitle} onClick={() => props.click(index)}>
                {/* eslint-disable-next-line */}
                <a className={selected}>
                    {icon}
                    <span className="label">{cardTitle}</span>
                </a>
            </TitleItem>
        )
    })

    return (
        <NavSection>
            <LabTitle>{props.labTitle}</LabTitle>
            <CardTitle>{currentCardTitle}</CardTitle>
            <Course>
                {steps}
            </Course>
            <GemBox gems={props.totalGems} />

            <style jsx>{`
                a {
                    display: flex;
                    align-items: center;
                }
                a:hover {
                    color: salmon;
                }
                .dot {
                    display: inline-block;
                    margin-right: -7px;
                    width: 7px;
                    height: 7px;
                    min-width: 7px;
                    border-radius: 50%;
                    background: #efefef;
                    transform: translateX(-4px);
                    transition: background 0.5s ease;
                }
                .selected .dot {
                    margin-right: -9px;
                    width: 9px;
                    height: 9px;
                    min-width: 9px;
                    background: salmon;
                    transform: translateX(-5px);
                }
                .finished .dot {
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    margin-right: -16px;
                    background: white;
                    transform: translateX(-8px);
                }
                .label {
                    margin-left: 1.25rem;
                    transition: background 0.2s ease;
                }
                .selected .label {
                    font-weight: bold;
                }
            `}</style>
        </NavSection>
    )
}

export default Navigation;
