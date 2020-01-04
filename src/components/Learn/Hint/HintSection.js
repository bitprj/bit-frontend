import React, { Component } from 'react';

import Hint from './Hint';

import LearnService from '../../../services/LearnService';

class HintSection extends Component {
    constructor(props) {
        super();
        this.state = {
            labID: props.labID,
            cardID: props.cardID,
            hints: [],
            // hintIDs: ['348E6VILsWPo8dO6aMJfqI', '5ccsEwASPP5PIR8IlAVgV6'],
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
            this.service.getHintStatus(this.state.labID, this.state.cardID).then(data => {
                const unlocks = data.hints_unlocked.map(hint => {
                    return {
                        id: hint.contentful_id,
                        isLocked: false
                    }
                });

                const locks = data.hints_locked.map(hint => {
                    return {
                        id: hint.contentful_id,
                        isLocked: true
                    }
                });

                this.setState({
                    hints: [...unlocks, ...locks]
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
            const display = (!currentHint || hint.id === currentHint) ? true : false;
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
            <div>
                {hints}
            </div >
        )
    }
}

export default HintSection;
