import React, { Component } from 'react';
import styled from 'styled-components';

import GemBox from '../shared/GemBox';

import LearningService from '../../services/LearningService';

const HintCard = styled.div`
    flex-direction: column;
    justify-content: space-between;
    padding: .65rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: ${props => props.locked ? '#000033' : 'white'}
    color: ${props => props.locked ? 'white' : 'black'}
`

const HintTitle = styled.div`
    margin: 0 0 10px 0;
    font-weight: bold;
`

class Hint extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            title: '',
            difficulty: '',
            gems: null,
            locked: true,
            content: '',
            parent: null,
            steps: null
        }

        this.service = new LearningService();
    }

    componentDidMount() {
        this.service.getHint(1).then(data => {
            this.setState({
                id: data.id,
                title: data.name,
                difficulty: data.difficulty,
                gems: data.gems,
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.locked ?
                    <HintCard locked={this.state.locked}>
                        <HintTitle>{this.state.title}</HintTitle>
                        <GemBox gems={this.state.gems} />
                    </HintCard>
                    :
                    <HintCard locked={this.state.locked}>
                        <HintTitle>{this.state.title}</HintTitle>
                        <div>{this.state.content}</div>
                    </HintCard>
                }
            </div>
        )
    }
}

export default Hint;