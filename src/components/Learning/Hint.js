import React, { Component } from 'react';
import { styled } from 'styled-components';

const HintCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
`

class Hint extends Component {
    constructor() {
        super();
        this.state = {
            locked: true
        }
    }

    render() {
        return (
            <HintCard>
                HelloWorld
            </HintCard>
        )
    }
}

export default Hint;