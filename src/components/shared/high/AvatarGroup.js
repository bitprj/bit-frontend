import React, { cloneElement } from 'react'
import { Stack } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { v4 as uuid } from 'uuid'

const StyleProvider = styled.div`
	.sb-avatar__text {
		border: 0.12em solid ${props => props.borderColor};
	}
`

const AvatarGroup = ({
	size = '1.6em',
	borderColor = '#ffffff',
	max,
	spacing = '-0.8em',
	children,
	textSizeRatio = 2.5,
	...props
}) => {
	const clones = children?.map((a, i) => {
		if (max && i > max) return null

		return cloneElement(a, {
			key: uuid(),
			style: {
				marginLeft: i === 0 ? 0 : spacing,
				zIndex: children.length - i
			},
			size,
			round: true,
			textSizeRatio
		})
	})

	return (
		<StyleProvider borderColor={borderColor}>
			<Stack isInline {...props}>
				{clones}
			</Stack>
		</StyleProvider>
	)
}

export default AvatarGroup
