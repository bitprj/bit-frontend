import React from 'react'
import styled from 'styled-components'
import Icon from '../../../../shared/gadgets/Icon'

const LeftPanel = styled.div`
	padding: 2em;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const SlideLeftPanel = ({ name, steps }) => {
	return (
		<LeftPanel>
			<h2>{name}</h2>
		</LeftPanel>
	)
}

const RightPanel = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ConceptIcon = styled(Icon)`
	width: 100%;
`

export const SlideRightPanel = () => {
	return (
		<RightPanel>
			<ConceptIcon
				src={require('../../../../../assets/icons/checkpoint.svg')}
			/>
		</RightPanel>
	)
}
