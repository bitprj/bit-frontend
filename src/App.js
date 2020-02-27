import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Student from './pages/Student'
import Explore from './pages/Explore'
import NotFound from './pages/NotFound'

import { GlobalStyle, GlobalStyleReset } from './styles/GlobalStyles'
import WithProviders from './components/HOC/WithProviders'
import WithAuthentication from './components/HOC/WithAuthentication'

const App = () => {
	return (
		<WithProviders>
			<GlobalStyleReset />
			<GlobalStyle />
			<BrowserRouter>
				<WithAuthentication>
					<Layout>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/explore" exact component={Explore} />
							<Route path="/learn" exact component={Learn} />
							<Route component={NotFound} />
						</Switch>
					</Layout>
				</WithAuthentication>
			</BrowserRouter>
		</WithProviders>
	)
}

export default App
