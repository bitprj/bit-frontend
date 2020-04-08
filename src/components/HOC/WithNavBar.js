import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../NavBar/NavBar'

const Main = styled.main`
	background-color: ${props => props.theme.bgPage};
	position: relative;
`

const WithNavBar = props => (
	<>
		<Switch>
			<Route path="/learn/" />
			<Route path="/grade/" />
			<Route path="/" component={NavBar} />
		</Switch>
		<Main>{props.children}</Main>
	</>
)

export default WithNavBar
