import React from 'react'
import { Box } from '@chakra-ui/core'
import styled from '@emotion/styled'

const Rendered = styled(Box)`
	transition: 250ms all;

	:focus {
		box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
	}
`

const Interactive = ({ ...props }) => {
	return <Rendered tabIndex="0" outline="0" {...props} />
}

export default Interactive
