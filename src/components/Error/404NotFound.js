import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	padding: 2em;
	text-align: center;
`

const NotFound = () => (
	<Container>
		<h1 style={{ margin: 0 }}>You appear to be on a missing page. Oh well!</h1>
		<br />
		<h1 style={{ margin: 0 }}>(ﾉ◕ヮ◕)ﾉ︵ ✧･ﾟ┻━┻*:･ﾟ✧</h1>
	</Container>
)

export default NotFound
