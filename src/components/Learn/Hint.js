import React, { Component } from 'react';
import styled from 'styled-components';

import HintModal from './HintModal';

import LearnService from '../../services/LearnService';

const HintCard = styled.div`
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
            isLocked: true,
            content: '',
            parent: null,
            steps: null
        }
        this.unlockClickedHandler = this.unlockClickedHandler.bind(this);

        this.service = new LearnService();
    }

    componentDidMount() {
        this.service.getHint(1).then(data => {
            this.setState({
                id: data.id,
                title: data.name,
                difficulty: data.difficulty,
                gems: data.gems,
                content: data.content,
                steps: data.steps
            })
        })
    }

    unlockClickedHandler = () => {
        alert('clicked');
        // later - API call to unlock card and get its content
    }

    render() {
        return (
            <div>
                {this.state.isLocked ?
                    <HintCard locked={this.state.isLocked}>
                        <HintTitle>{this.state.title}</HintTitle>
                        <HintModal
                            hintID={this.state.id}
                            gems={this.state.gems}
                            unlockClick={this.unlockClickedHandler} />
                    </HintCard>
                    :
                    <HintCard locked={this.state.isLocked}>
                        <HintTitle>{this.state.title}</HintTitle>
                        <div>{this.state.content}</div>
                    </HintCard>
                }
            </div>
        )
    }
}

export default Hint;