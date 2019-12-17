import React from 'react';
import styled from 'styled-components';
import NameCard from './Card';

const MenuBar = styled.div`
    margin: 20px 20px 0 0;
    width: 600px;
`

const Navigation = (props) => {
    const steps = props.cardTitles.map((cardTitle, index) => {
        const selected = (index === props.currentCard) ? "selected" : null;
        return (
            <li key={cardTitle} onClick={() => props.click(index)}>
                <a className={selected}>
                    <span className="dot"></span>
                    <span className="label">{cardTitle} - {index}</span>
                </a>
            </li>
        )
    })

    return (
        <MenuBar>
            <NameCard />
            <ul>
                {steps}
            </ul>

            <style jsx>{`
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
                    margin-left: -1.25rem;
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
