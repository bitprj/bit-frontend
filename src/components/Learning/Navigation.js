import React from 'react';
import styled from 'styled-components';
import NameCard from './Card';

import CheckIcon from '../icons/check.js';

const MenuBar = styled.div`
    margin: 20px 20px 0 0;
    width: 600px;
`

const Navigation = (props) => {
    const steps = props.cardTitles.map((cardTitle, index) => {
        const selected = (index === props.currentCard) ? "selected" : null;
        const check = <span className="check-icon"><CheckIcon color="#2BDB66" /></span>;
        const dot = <span className="dot"></span>
        const icon = (index < props.lastCardUnlocked) ? check : dot;
        return (
            <li key={cardTitle} onClick={() => props.click(index)}>
                {/* eslint-disable-next-line */}
                <a className={selected}>
                    {icon}
                    <span className="label">{cardTitle} - {index}</span>
                </a>
            </li>
        )
    })

    return (
        <MenuBar>
            <NameCard />
            <div className="menu">
                <ul>
                    {steps}
                </ul>
            </div>

            <style jsx>{`
                .menu {
                    margin: 0 0 0 40px;
                    padding: 50px 0 40px 0;
                    border-left: 1px solid rgb(239, 239, 239);
                }
                ul {
                    margin-block-start: 1em;
                    margin-block-end: 1em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 0px;
                }
                .check-icon {
                    margin-left: -0.5rem
                }
                li {
                    list-style: none;
                    margin: 12px 0;
                }
                a {
                    display: flex;
                    align-items: center;
                    color: unset;
                    text-decoration: none;
                }
                a:hover {
                    color: gray;
                }
                .dot {
                    display: inline-block;
                    // margin-left: -.5rem;
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
        </MenuBar>
    )
}

export default Navigation;
