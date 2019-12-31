import React, { Component } from 'react';

import Hint from './Hint';

class HintSection extends Component {
    constructor() {
        super();
        this.state = {
            hintIDs: ['348E6VILsWPo8dO6aMJfqI', '5ccsEwASPP5PIR8IlAVgV6']
        }
    }

    render() {
        const hints = this.state.hintIDs.map(hintID => {
            return <Hint key={`hint-${this.state.id}`} id={hintID} changeTotalGems={this.props.changeTotalGems} />
        })

        return (
            <div>
                {hints}
            </div>
        )
    }
}

export default HintSection;
