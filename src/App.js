import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './components/Home'

import Student from './components/Student/Student'
import Teacher from './components/Teacher/Teacher'

import Learn from './components/Learn/Learn'
import Explore from './components/Explore/Explore'
import Module from './components/Student/Module/Module'
import Activity from './components/Student/Activity/Activity'
import Article from './components/Article'
import World from './components/Student/World/World'

import NotFound from './components/Error/404NotFound'

import WithGlobalHOC from './components/HOC/WithGlobalHOC'

import { ping } from './services/TestService'

const App = () => {
	useEffect(() => {
		ping()
	}, [])

	return (
		<BrowserRouter>
			<WithGlobalHOC>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/explore/" component={Explore} />
					<Route path="/modules/:id/" component={Module} />
					<Route path="/activities/:id/" component={Activity} />
					<Route path="/worlds/:id/" component={World} />
					<Route path="/dashboard/" component={Student} />
					<Route path="/learn/" component={Learn} />
					<Route path="/grade/" component={Teacher} />
					<Route path="/articles/:id" component={Article} /> 
					<Route component={NotFound} />				
				</Switch>
			</WithGlobalHOC>
		</BrowserRouter>
	)
}

export default App
