import React, { useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import HeaderShadow from '../shared/utils/HeaderShadow'
import ImgAndContent from '../shared/gadgets/ImgAndContent'
import ParsedContent from '../shared/ParsedContent'

const Container = styled.div`
	flex: 2;
	position: relative;
	background-color: #fff;
	overflow-y: auto;
`

const HeaderWrapper = styled.div`
	position: sticky;
	top: 0;
`

const Header = styled(ImgAndContent)`
	margin: 0;
	margin-left: 1em;
	cursor: auto;
	background-color: #fff;
`

const RenderedContent = styled.div`
	padding: 1em 2em 3em;
`

const Content = props => {
	const containerRef = useRef(null)

	return (
		<Container ref={containerRef}>
			<HeaderWrapper>
				<Header
					imgURL="../../assets/icons/logo.png"
					imgWidthEms="5"
					gap="1em"
					noShadow
					reverse
					title={props.name}
				>
					<code>INTRODUCTION TO GITHUB</code>
				</Header>
				<HeaderShadow containerRef={containerRef} />
			</HeaderWrapper>

			<RenderedContent>
				<ParsedContent content={props.content} />
			</RenderedContent>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		viewManager: { current_view_learn },
		learnData: { name, cards }
	} = state

	return {
		name,
		content: cards && cards[current_view_learn].fields.content
	}
}

export default connect(mapStateToProps)(Content)
