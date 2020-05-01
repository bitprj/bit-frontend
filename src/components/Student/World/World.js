import React from 'react'
import styled from 'styled-components'
import ModuleSummary from '../../shared/high/ModuleSummary.js'

const Container = styled.div``

// mock data
const property = {
	width: '15em',
	height: '18em',
	avatarGroupWidth: 5, //unit: em
	imageUrl: "https://cdn.dribbble.com/users/57404/screenshots/4484188/framework_grafico-mesa_redonda.png",
	title: "DevOps for Busy People",
	peoples: ['Jack', 'Henry', 'Wong', 'Lee', 'Chen','Jack', 'Henry', 'Wong', 'Lee', 'Chen','Jack', 'Henry', 'Wong', 'Lee', 'Chen']
}

const World = ({ className, ...props }) => {
	return (
		<Container className={className} {...props}>
			<ModuleSummary {...property}>
			</ModuleSummary>
		</Container>
	)
}

export default World
