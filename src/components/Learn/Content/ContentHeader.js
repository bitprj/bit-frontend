import React, { forwardRef } from 'react'
import styled from 'styled-components'

import HeaderShadow from '../../shared/utils/HeaderShadow'
import ImgAndContent from '../../shared/gadgets/ImgAndContent'

const Container = styled.div`
	position: fixed;
	top: 0;
	width: 75%;
	z-index: 99;
	opacity: 0;
`

const Header = styled(ImgAndContent)`
	margin: 0;
	padding: 2em 1em 1.5em;
	padding-left: 3em;
	cursor: auto;
	background-color: #fff;

	transition: 0.2s ease padding;

	&.content-minimized {
		padding-top: 1em;
		padding-bottom: 1em;
	}
`

const ContentHeader = forwardRef(({ containerRef, name }, ref) => {
	return (
		<Container id="learn-content-header" className="learn-i-contentheader">
			<Header
				ref={ref}
				imgURL={require('../../../assets/icons/document.svg')}
				imgWidthEms="4"
				gap="2em"
				reverse
				contentSize={'150%'}
				title={name}
			>
				<code style={{ fontSize: '50%', backgroundColor: 'transparent' }}>
					INTRODUCTION TO GITHUB
				</code>
			</Header>
			<HeaderShadow containerRef={containerRef} />
		</Container>
	)
})

export default ContentHeader
