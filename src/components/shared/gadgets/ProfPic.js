import React from 'react'
import styled from 'styled-components'

import Icon from './Icon'

const VerticalAlign = styled.div`
	display: flex;
	align-items: center;
`

const AccountContainer = styled.div`
	display: flex;
	cursor: default;
`

const ProfilePicture = styled(Icon)`
	margin-right: 0.5em;
	padding: 0.1em;
	background-color: ${props => props.theme.accentVariant};
`

const ProfPic = ({ src, children, iconSize }) => {
	return (
		<AccountContainer>
			<VerticalAlign>
				<ProfilePicture src={src} width={iconSize} height={iconSize} circle />
				{children}
			</VerticalAlign>
		</AccountContainer>
	)
}

export default ProfPic
