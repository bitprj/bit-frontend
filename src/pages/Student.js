import React, { Component } from 'react'
import { connect } from 'react-redux'

import Progress from '../components/Student/Progress/Progress'
import Module from '../components/Student/Module/Module'

import * as studentData from '../redux/actions/studentData'
import * as viewTypes from '../redux/utils/viewTypes'

class Student extends Component {
	componentDidMount() {
		this.props.onInitStudentData()
	}

	componentDidUpdate() {
		console.log('[Student Updated]')
		if (this.props.is_student_data_loaded) {
			// if (!this.props.suggested_activity)
			// this.props.onInitSuggestedActivity(this.props.current_activities[0].id);
			// if (!this.props.current_topic)
			// this.props.onInitCurrentTopic(this.props.current_topic_id);
		}
	}

	handleCurrentView() {
		switch (this.props.currentView) {
			case viewTypes.PROGRESS:
				return <Progress />

			case viewTypes.MODULE:
				return <Module />

			default:
				return null
		}
	}

	resumeClickedHandler() {
		// go to current lab
	}

	render() {
		return <>{this.handleCurrentView()}</>
	}
}

const mapStateToProps = state => {
	return {
		currentView: state.viewManager.current_view_student,
		...state.studentData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitStudentData: () => dispatch(studentData.initStudentData()),
		onInitSuggestedActivity: id =>
			dispatch(studentData.initSuggestedActivity(id)),
		onInitCurrentTrack: id => dispatch(studentData.initCurrentTrack(id)),
		onInitCurrentTopic: id => dispatch(studentData.initCurrentTopic(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)
