import React, { Component } from 'react';

import StudentHero from '../components/Student/StudentHero';
import StudentContent from '../components/Student/StudentContent';

import StudentService from '../services/StudentService';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            studentName: '',
            currentLab: {
                labIcon: "https://maxcdn.icons8.com/Share/icon/p1em/Logos/github1600.png",
                labTitle: "Intro to Github",
                labDescription: "Bacon ipsum dolor amet pancetta short ribs pig shankle chicken. Kielbasa ribeye salami jerky ham hock short ribs pork belly boudin filet mignon ham, ball tip beef ribs turducken."
            }
        }
        this.service = new StudentService()
    }

    componentDidMount() {
        this.service.getStudentInfo('token').then(data => {
            this.setState({
                studentName: data.name,
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

                <StudentContent />
            </div >
        )
    }
}

export default Student;
