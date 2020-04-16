import { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUserData } from '../../redux/actions/account'
import { init as initStudentData } from '../../redux/actions/studentData'

const WithUserData = ({
	children,
	userId,
	studentId,
	onInitUserData,
	onInitStudentData
}) => {
	useEffect(() => {
		if (userId) onInitUserData(userId)
		if (studentId) onInitStudentData(studentId)
	}, [userId, studentId])

	return children
}

const mapStateToProps = state => {
	const { userId, studentId } = state.account.meta ?? {}
	return {
		userId,
		studentId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitUserData: userId => dispatch(initUserData(userId)),
		onInitStudentData: studentId => dispatch(initStudentData(studentId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithUserData)
