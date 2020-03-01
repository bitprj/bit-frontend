import React, { Component } from 'react'

import TeacherHero from './TeacherHero'
import TeacherContent from './TeacherContent'

class Teacher extends Component {
	constructor() {
		super()
		this.state = {
			teacherName: '',
			pendingAssignments: 4,
			submittedAssignments: 4
		}
		// this.service = new TeacherService();
	}

	render() {
		return (
			<div>
				<TeacherHero
					pending={this.state.pendingAssignments}
					submitted={this.state.submittedAssignments}
				/>
				<TeacherContent />
			</div>
		)
	}
}

export default Teacher
