import React, { Component } from 'react';
import styled from 'styled-components';

import Hint from './Hint';

import LearnService from '../../../services/LearnService';

const HintArea = styled.div`
    margin: 30px 10px; 
`

class HintSection extends Component {
    constructor(props) {
        super();
        this.state = {
            labID: props.labID,
            cardID: props.cardID,
            hints: [],
            currentHint: null
        }
        this.expandHint = this.expandHint.bind(this);
        this.shrinkHint = this.shrinkHint.bind(this);
        this.setCurrentHint = this.setCurrentHint.bind(this);
        this.setCardID = this.setCardID.bind(this);

        this.service = new LearnService();
    }

    componentDidUpdate(prevProps) {
        if (this.props.cardID !== prevProps.cardID) {
            this.setCardID(this.props.cardID);
            this.setCurrentHint(null);
            this.service.getHintStatus(this.state.labID, this.state.cardID)
                .then(rawData => this.service.processHintStatus(rawData))
                .then(data => {
                    this.setState({
                        hints: data
                    })
                });
        }
    }

    expandHint = (hintID) => {
        this.setCurrentHint(hintID);
    }

    shrinkHint = () => {
        this.setCurrentHint(null);
    }

    setCardID = id => {
        this.setState({ cardID: id });
    }

    setCurrentHint = status => {
        this.setState({ currentHint: status });
    }

    render() {
        const hints = this.state.hints.map(hint => {
            const currentHint = this.state.currentHint;
            const display = (!currentHint || hint.id === currentHint) ? 1 : 0;
            const renderedHint = <Hint key={`hint-${hint.id}`}
                id={hint.id}
                display={display}
                isLocked={hint.isLocked}
                changeTotalGems={this.props.changeTotalGems}
                expandHint={this.expandHint}
                shrinkHint={this.shrinkHint} />;
            return renderedHint;
        });

        return (
            <HintArea>
                {hints}
            </HintArea>
        )
    }
}

export default HintSection;
