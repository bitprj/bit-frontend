import React, { Component } from 'react';

import StudentHero from '../components/Student/StudentHero';
import StudentContent from '../components/Student/StudentContent';

import StudentService from '../services/StudentService';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            studentName: "Moomin Azkaban",
            currentTrack: {
                trackID: null,
                trackTitle: "",
                trackDescription: ""
            },
            currentTopic: {
                topicTitle: "Art of Programming",
                topicDescription: "Lorem ipsum Art of Programming."
            },
            currentLab: {
                labIcon: "https://maxcdn.icons8.com/Share/icon/p1em/Logos/github1600.png",
                labTitle: "Intro to Github",
                labDescription: "Bacon ipsum dolor amet pancetta short ribs pig shankle chicken. Kielbasa ribeye salami jerky ham hock short ribs pork belly boudin filet mignon ham, ball tip beef ribs turducken."
            }
        }
        this.studentService = new StudentService()
    }

    componentDidMount() {
        this.studentService.getCurrentTrack().then(data => {
            this.setState({
                currentTrack: {
                    trackID: data.id,
                    trackTitle: data.name,
                    trackDescription: data.description,
                }
            })
        })
    }

    resumeClickedHandler() {
        // go to current lab
    }

    render() {
        return (
            <div>
                <StudentHero
                    studentName={this.state.studentName}
                    labIcon={this.state.currentLab.labIcon}
                    labTitle={this.state.currentLab.labTitle}
                    labDescription={this.state.currentLab.labDescription}
                    resumeClicked={this.state.resumeClickedHandler}
                />

                <StudentContent
                    trackTitle={this.state.currentTrack.trackTitle}
                    trackDescription={this.state.currentTrack.trackDescription}
                    topicTitle={this.state.currentTopic.topicTitle}
                    topicDescription={this.state.currentTopic.topicDescription}
                />
            </div >
        )
    }
}

export default Student;