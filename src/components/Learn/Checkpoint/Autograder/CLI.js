import React from 'react'
import styled from 'styled-components'

import ImgAndContent from '../../../shared/low/ImgAndContent'

const cliSvg = require('../../../../assets/icons/cli.svg')

const Container = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 110%;
`

const TitleArea = styled(ImgAndContent)`
	padding: 0;
	cursor: default;
`

const CodeArea = styled.pre`
	padding: 1em 1.5em;
	background-color: #2b2b2b;
	color: #fff;
	white-space: nowrap;
	border-radius: 0.5em;
`

const CLI = ({
	description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
	command = 'bit_autograder input -i redit.py'
}) => {
	return (
		<Container>
			<div style={{ width: '32em', marginTop: '-2em' }}>
				<TitleArea
					imgWidthEms={5}
					imgURL={cliSvg}
					gap={'0.75em'}
					title="Push via CLI"
				>
					Upload Code Using Terminal
				</TitleArea>
				<p style={{ margin: '1.5em 0' }}>{description}</p>
				<CodeArea className="code low-profile-scrollbar only-hover light">
					{command}
				</CodeArea>
			</div>
		</Container>
	)
}

export default CLI
