import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import CheckIcon from '../../../assets/icons/check';
import GemBox from '../../shared/GemBox';
import NavDropdown from './NavDropdown';

const Course = styled.div`
    margin: 0 0 0 20px;
    padding: 20px 0 40px 0;
`

const NavSection = styled.div`
    color: white;
    padding-top: 3rem;
`

const NormalNav = styled.div`
    min-height: 100vh
`

const TitleSection = styled.div`
    margin-left: 30px;
`

const LabTitle = styled.div`
    font-size: 14px;
    margin-top: 5px;
`

const CardTitle = styled.div`
    font-weight: bold;
    font-size: 20px;
`

const TitleItem = styled.div`
    margin: 10px 0 0 15%;
    font-size: 14px;
`

const icon_style = {
    margin: '-8px',
    height: '15px',
}

const Navigation = (props) => {
    const currentCardTitle = props.cardTitles[props.currentCard];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function updateWindowWidth() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWindowWidth);
        updateWindowWidth();
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);

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

    const labTitle = <LabTitle>{props.labTitle}</LabTitle>;
    const cardTitle = <CardTitle>{currentCardTitle}</CardTitle>;
    const gemBox = <GemBox gems={props.totalGems} />

    return (
        <NavSection>
            {windowWidth < 600 ?
                <NavDropdown labTitle={labTitle}
                    cardTitle={cardTitle}
                    gemBox={gemBox}
                    steps={steps} />

                : <NormalNav>
                    <TitleSection>
                        {gemBox}
                        {labTitle}
                        {cardTitle}
                    </TitleSection>

                    <Course>
                        {steps}
                    </Course>
                </NormalNav>
            }

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
                    background: white;
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
