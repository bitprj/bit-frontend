import React, { Component } from 'react';
import styled from 'styled-components';

import NotificationBox from '../Teacher/NotificationBox';

const NotiArea = styled.div`
    margin-left: -8px;
`

class NotificationSection extends Component {
    state = {
        statusDot: 'dot',
        labTitle: 'Intro to Command Line',
        studentName: 'S. Gupta',
        time: '2 min ago'
    }
    render() {
        return (
            <NotiArea>
                <NotificationBox status={this.state.statusDot}
                    labTitle={this.state.labTitle}
                    studentName={this.state.studentName}
                    time={this.state.time} />
                <NotificationBox status={this.state.statusDot}
                    labTitle={this.state.labTitle}
                    studentName={this.state.studentName}
                    time={this.state.time} />
                <NotificationBox status={this.state.statusDot}
                    labTitle={this.state.labTitle}
                    studentName={this.state.studentName}
                    time={this.state.time} />
            </NotiArea>
        )
    }
}

export default NotificationSection;
