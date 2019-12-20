import React, { Component } from 'react';

import MenuBar from './MenuBar';

class StudentContent extends Component {
    constructor() {
        super();
        this.state = {
            currentWindow: 2
        }
    }

    windowClickedHandler(index) {
        this.setState({
            currentWindow: index
        })
    }

    render() {
        return (
            <MenuBar
                currentWindow={this.state.currentWindow}
                clicked={this.windowClickedHandler.bind(this)}
            />
            // <div>{this.props.trackTitle}</div>

        )
    }
}

export default StudentContent;