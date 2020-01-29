import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ImgAndContent from '../shared/gadgets/ImgAndContent'
import ParsedContent from '../shared/ParsedContent'

const Container = styled.div`
	flex: 2;
	position: relative;
	// z-index: 1;
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

const ShadowWrapper = styled.div`
	height: 2em;
	position: absolute;
	left: 0;
	right: 0;
	overflow: hidden;
`

const Shadow = styled.div`
	display: block;
	width: 80%;
	height: 2em;
	margin: -2em auto 0;
	border-radius: 8em / 1em;
	box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.2);
	opacity: 0;
`

const Cover = styled.div`
	position: absolute;
	// height: 1em;
	background-color: white;
	left: 0;
	right: 0;
`

const RenderedContent = styled.div`
	padding: 1em 2em 3em;
`

const Content = props => {
	useEffect(() => {
		handleShadow()
		containerRef.current.addEventListener('scroll', handleShadow)
		return () => {
			containerRef.current.removeEventListener('scroll', handleShadow)
		}
	}, [])

	const containerRef = useRef(null)
	const shadowRef = useRef(null)

	const handleShadow = () => {
		let scrollTop = containerRef.current.scrollTop / 15
		shadowRef.current.style.opacity = scrollTop > 1 ? 1 : scrollTop
	}

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
				<ShadowWrapper>
					<Shadow ref={shadowRef} className="transition-short"></Shadow>
				</ShadowWrapper>
			</HeaderWrapper>

			<RenderedContent>
				<Cover />
				<ParsedContent content={props.content} />
			</RenderedContent>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		viewManager: { current_view_learn },
		learnData: { name, cards: steps }
	} = state

	return {
		name,
		content: steps && steps[current_view_learn].fields.content
	}
}

export default connect(mapStateToProps)(Content)
