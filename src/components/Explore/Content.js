import React from 'react'
import styled from 'styled-components'

import FeaturedDisplay from './FeaturedDisplay'

const Container = styled.div`
	padding-top: 2em;
	padding-left: 2em;
	padding-right:2em;
	height:100vh;
	width:100%;
`

const Header = styled.div`
	text-align: center;
    border: 2px solid#25215a;
    box-shadow: 5px 6px 0px#25215a;
`



const Content = props => {
	return (
		<Container>
			<Header><h1>{props.activeName}</h1></Header>
				<FeaturedDisplay />
		</Container>
	)
}

export default Content
