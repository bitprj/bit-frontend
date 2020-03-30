import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard'

const Student = ({}) => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			<Route path={`${path}/`} component={Dashboard} />
		</Switch>
	)
}

export default Student
