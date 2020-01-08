import React, { Component } from 'react';

import Activity from './Activity';
import Curriculum from './Curriculum';
import MenuBar from './MenuBar';
import Progress from './Progress/Progress';
import Profile from './Profile';

class StudentContent extends Component {
    state = {
        currentWindow: 2
    }

    windowClickedHandler(index) {
        this.setState({
            currentWindow: index
        })
    }

    render() {
        return (
            <div /* id='content' */>
                <MenuBar
                    currentWindow={this.state.currentWindow}
                    clicked={this.windowClickedHandler.bind(this)}
                    />

                {this.state.currentWindow === 0 ?
                    <Curriculum />
                    : null}

                {this.state.currentWindow === 1 ?
                    <Activity />
                    : null}

                {this.state.currentWindow === 2 ?
                    <Progress />
                    : null}

                {this.state.currentWindow === 3 ?
                    <Profile />
                    : null}
            </div>
        )
    }
}

export default StudentContent;