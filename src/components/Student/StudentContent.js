import React, { Component } from 'react';

import Activity from './Activity';
import Curriculum from './Curriculum';
import MenuBar from './MenuBar';
import Progress from './Progress/Progress';
import Profile from './Profile';

import StudentService from '../../services/StudentService';

class StudentContent extends Component {
    constructor() {
        super();
        this.state = {
            currentWindow: 2,
            currentTopic: {
                title: '',
                description: ''
            },
            currentTrack: {
                id: null,
                title: '',
                description: ''
            },
        }

        this.studentService = new StudentService()
    }

    componentDidMount() {
        // replace with this.props.currentTopicID/currentTrackID later :(
        this.studentService.getTopic(1).then(data => {
            this.setState({
                currentTrack: {
                    id: data.id,
                    title: data.name,
                    description: data.description,
                }
            })
        })

        this.studentService.getTrack(1).then(data => {
            this.setState({
                currentTrack: {
                    id: data.id,
                    title: data.name,
                    description: data.description,
                }
            })
        })
    }

    windowClickedHandler(index) {
        this.setState({
            currentWindow: index
        })
    }

    render() {
        return (
            <div>
                <MenuBar
                    currentWindow={this.state.currentWindow}
                    clicked={this.windowClickedHandler.bind(this)} />

                {this.state.currentWindow === 0 ?
                    <Curriculum />
                    : null}

                {this.state.currentWindow === 1 ?
                    <Activity />
                    : null}

                {this.state.currentWindow === 2 ?
                    <Progress
                        topicTitle={this.state.currentTrack.title}
                        topicDescription={this.state.currentTrack.description}
                    />
                    : null}

                {this.state.currentWindow === 3 ?
                    <Profile />
                    : null}
            </div>
        )
    }
}

export default StudentContent;