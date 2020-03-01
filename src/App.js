import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import OldTeacher from './components/Teacher/unused/Teacher'
import Teacher from './components/Teacher/Teacher'
import Home from './components/Home'
import Learn from './components/Learn/Learn'
import Explore from './components/Explore/Explore'
import NotFound from './components/Error/404NotFound'

import WithGlobalHOC from './components/HOC/WithGlobalHOC'

const App = () => {
	return (
		<BrowserRouter>
			<WithGlobalHOC>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/explore" exact component={Explore} />
					<Route path="/learn" exact component={Learn} />
					<Route path="/grade" exact component={Teacher} />
					<Route path="/oteacher" exact component={OldTeacher} />
					<Route component={NotFound} />
				</Switch>
			</WithGlobalHOC>
		</BrowserRouter>
	)
}

export default App
