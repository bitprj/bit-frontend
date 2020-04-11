import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import BackIcon from '@material-ui/icons/KeyboardArrowLeftRounded'

import IconLine from '../low/IconLine'

const Container = styled.div`
	margin-bottom: 0.2em;
	width: fit-content;
	color: ${props => props.theme.offFont};
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.accentVariant};
	}
`

const GoBack = ({ history, className, text = 'Back', hardcodedUrl }) => (
	<Container
		className={className}
		onClick={
			hardcodedUrl
				? () => {
						history.push(hardcodedUrl)
				  }
				: history.goBack
		}
	>
		<IconLine icon={<BackIcon />}>{text}</IconLine>
	</Container>
)

export default withRouter(GoBack)
