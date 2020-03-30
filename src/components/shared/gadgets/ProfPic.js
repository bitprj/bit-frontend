import React from 'react'
import styled from 'styled-components'

import Icon from './Icon'

const VerticalAlign = styled.div`
	display: flex;
	align-items: center;
`

const AccountContainer = styled.div`
	display: flex;
`

const ProfilePicture = styled(Icon)`
	margin-right: 0.5em;
	padding: 0.1em;
`

const ProfPic = ({ src, children, iconSize }) => {
	return (
		<AccountContainer>
			<VerticalAlign>
				{src && (
					<ProfilePicture
						src={src}
						noDefault
						width={iconSize}
						height={iconSize}
						circle
					/>
				)}
				{children}
			</VerticalAlign>
		</AccountContainer>
	)
}

export default ProfPic
