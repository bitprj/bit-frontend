import React from 'react'
import styled from 'styled-components'

import AddIcon from '@material-ui/icons/Add'
import MuiIconBox from '../../shared/high/MuiIconBox'

const Container = styled.div`
	margin-top: 0;
	padding: 2em 3em;
	height: 15em;

	display: flex;
	align-items: center;

	border-radius: 1em;
	background-color: #fff;
	text-align: center;
	cursor: pointer;
`

const ButtonContainer = styled(MuiIconBox)`
	margin-top: 1.5em;
`

const PickCard = ({}) => {
	return (
		<Container className="hover-raise transition-medium">
			<div>
				<h2 style={{ margin: '0.5em 0', fontSize: '115%' }}>Pick a Module</h2>
				<p style={{ fontSize: '85%', margin: 0 }}>
					Choose a module and learn an interesting tidbit about python
				</p>
				<ButtonContainer width={'2em'}>
					<AddIcon />
				</ButtonContainer>
			</div>
		</Container>
	)
}

export default PickCard
