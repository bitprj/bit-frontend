import React from 'react';
import styled from 'styled-components';

import CheckIcon from '../../assets/icons/check';

const RenderedButton = styled.div`
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 1rem 0.5rem;
    border-radius: 7px;
    color: #0070f3;
    background-color: transparent;
    border: none;
    font-size: inherit;
    line-height: inherit;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        color: #0070f3;
        background: rgba(0, 118, 255, 0.1);
    }

    &.invert {
        padding: 0 2rem;
        line-height: 2.5rem;
        border-radius: 7px;
        background-color: #0070f3;
        box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
        color: white;
    }

    &.invert:hover {
        background: rgba(0, 118, 255, 0.9);
        box-shadow: 0 6px 20px rgba(0, 118, 255, 0.23);
    }

    &.invert:active {
        background: #006ae6;
    }
`

const Button = (props) => {
    switch (props.buttonState) {
        case 'Check':
            return <CheckIcon color="#2BDB66" check_width="32" check_height="32" />
        case 'NextHint':
            return (
                <RenderedButton className={props.class_name} onClick={() => props.click(props.index)}>
                    >
                </RenderedButton>
            )
        case '':
            return true;

        default:
            return (
                <RenderedButton className={props.class_name} onClick={props.click}>
                    {props.buttonState}
                </RenderedButton>
            )
    }
}

export default Button;