import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Progress from './Progress/Progress'

const Student = ({}) => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			<Route path={`${path}/`} component={Progress} />
		</Switch>
	)
}

export default Student
