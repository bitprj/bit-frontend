import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from './NavBar'

const Main = styled.main`
	background-color: ${props => props.theme.bgPage};
	position: relative;
`

const Layout = props => (
	<>
		<Switch>
			<Route path="/new-learn" exact />
			<Route path="/" component={NavBar} />
		</Switch>
		<Main>{props.children}</Main>
	</>
)

export default Layout
