import React from 'react';
import styled from 'styled-components';

import CheckIcon from '../../assets/icons/check';
import GemBox from '../shared/GemBox';

const Course = styled.div`
    margin: 0 0 0 15%;
    padding: 50px 0 40px 0;
    border-left: 1px solid rgb(239, 239, 239);
`

const LabCard = styled.div`
    justify-content: space-between;
    padding: .65rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: #000033;
    color: white;
`

const Navigation = (props) => {
    const currentCardTitle = props.cardTitles[props.currentCard];

    const steps = props.cardTitles.map((cardTitle, index) => {
        const selected = (index === props.currentCard) ? "selected" : null;
        const check = <CheckIcon color="#2BDB66" check_width="16" check_height="16" />;
        const dot = <span className="dot"></span>;
        const icon = (index < props.lastCardUnlocked) ? check : dot;

        return (
            <li key={cardTitle} onClick={() => props.click(index)}>
                {/* eslint-disable-next-line */}
                <a className={selected}>
                    {icon}
                    <span className="label">{cardTitle}</span>
                </a>
            </li>
        )
    })

    return (
        <div>
            <LabCard>
                <div>{props.labTitle}</div>
                <h3>{currentCardTitle}</h3>
                <GemBox gems={props.totalGems} />
            </LabCard>

            <Course>
                <ul>
                    {steps}
                </ul>
            </Course>

            <style jsx>{`
                ul {
                    margin-block-start: 1em;
                    margin-block-end: 1em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 0px;
                }
                li {
                    list-style: none;
                    margin: 12px 0;
                }
                a {
                    display: flex;
                    align-items: center;
                }
                a:hover {
                    color: gray;
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
                    background: #111;
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
        </div>
    )
}

export default Navigation;
