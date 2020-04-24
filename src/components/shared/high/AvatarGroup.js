import React, { cloneElement } from 'react'
import { Stack } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { v4 as uuid } from 'uuid'

const StyleProvider = styled.div`
	.sb-avatar__text {
		border: 0.12em solid ${props => props.borderColor};
	}
	display: flex;
`
const Names = styled.p`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 0.37em;
	line-height: 1.4em;
	color: #6D6D6D;
	margin-left: 0.2em;
`

const AvatarGroup = ({
	size = '1.6em',
	borderColor = '#ffffff',
	max,
	spacing = '-0.8em',
	children,
	textSizeRatio = 2.5,
	names = [],
	showNames = false,
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
			{showNames && <Names>{names.map((m, i)=>{
				if (max && i > max) return null;
				if (i === names.length - 1) return m;
				return m + ', ';
			})}</Names>}
		</StyleProvider>
	)
}

export default AvatarGroup
