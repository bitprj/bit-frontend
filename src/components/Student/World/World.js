import React from 'react'
import styled from 'styled-components'

const Container = styled.div``

const World = ({ className, ...props }) => {
	return (
		<Container className={className} {...props}>
			{/* ... */}
		</Container>
	)
}

export default World
