import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import BackIcon from '@material-ui/icons/KeyboardArrowLeftRounded'

import IconLine from '../gadgets/IconLine'

const Container = styled.div`
  margin-bottom: 0.2em;
	width: fit-content;
	color: ${props => props.theme.offFont};
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.accentVariant};
	}
`

const GoBack = ({ className, history }) => (
	<Container className={className} onClick={history.goBack}>
		<IconLine icon={<BackIcon />}>Go Back</IconLine>
	</Container>
)

export default withRouter(GoBack)
