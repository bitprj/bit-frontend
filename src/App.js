import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Home from './components/Home'

import Student from './components/Student/Student'
import Teacher from './components/Teacher/Teacher'
import OldTeacher from './components/Teacher/unused/Teacher'

import Learn from './components/Learn/Learn'
import Explore from './components/Explore/Explore'
import Module from './components/Student/Module/Module'

import NotFound from './components/Error/404NotFound'

import WithGlobalHOC from './components/HOC/WithGlobalHOC'
import { init } from './redux/actions/studentData'

const App = ({ userType, onInit }) => {
	useEffect(() => {
		if (userType && userType !== 'VISITOR') {
			onInit()
		}
	}, [userType])

	return (
		<BrowserRouter>
			<WithGlobalHOC>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/explore" component={Explore} />
					<Route path="/modules/:id" component={Module} />
					<Route path="/dashboard" component={Student} />
					<Route path="/learn" component={Learn} />
					<Route path="/grade" component={Teacher} />
					<Route path="/oteacher" component={OldTeacher} />
					<Route component={NotFound} />
				</Switch>
			</WithGlobalHOC>
		</BrowserRouter>
	)
}

const mapStateToProps = state => ({
	userType: get(state, 'account.userType')
})

const mapDispatchToProps = dispatch => {
	return {
		onInit: () => dispatch(init())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
