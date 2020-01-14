import React, { Component, Fragment } from 'react';
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
        this.setCurrentHint = this.setCurrentHint.bind(this);
        this.setCardID = this.setCardID.bind(this);
        this.showChildrenHints = this.showChildrenHints.bind(this);

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

    setCardID = id => {
        this.setState({ cardID: id });
    }

    setCurrentHint = status => {
        this.setState({ currentHint: status });
    }

    showChildrenHints = (index) => {
        const newHints = [...this.state.hints];
        newHints[index].isLocked = false;
        this.setState({ hints: newHints });
    }

    render() {
        const hints = this.state.hints.map((hint, index) => {
            const currentHint = this.state.currentHint;
            const display = (!currentHint || hint.id === currentHint) ? 1 : 0;
            const renderedHint = <Hint key={`parent-hint-${hint.id}`}
                dbID={hint.dbID}
                id={hint.id}
                display={display}
                index={index}
                isLocked={hint.isLocked}
                isParent={true}
                changeTotalGems={this.props.changeTotalGems}
                showChildrenHints={this.showChildrenHints}
                setCurrentHint={this.setCurrentHint} />;

            const children = hint.children.map(child => {
                const childDisplay = (!currentHint || child.id === currentHint) ? 1 : 0;
                return <Hint key={`child-hint-${child.id}`}
                    id={child.id}
                    display={childDisplay}
                    isLocked={child.isLocked}
                    isParent={false}
                    changeTotalGems={this.props.changeTotalGems}
                    setCurrentHint={this.setCurrentHint} />;
            });

            return (
                <Fragment key={`hint-${hint.id}`}>
                    {renderedHint}
                    {!hint.isLocked ? children : null}
                </Fragment>
            )
        });

        return (
            <HintArea>
                {hints}
            </HintArea>
        )
    }
}

export default HintSection;
