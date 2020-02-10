import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ShadowWrapper = styled.div`
	height: 2em;
	position: absolute;
	left: 0;
	right: 0;
  overflow: hidden;
  pointer-events: none;
`
const Shadow = styled.div`
	display: block;
	width: 88%;
	height: 2em;
	margin: -2em auto 0;
	border-radius: 8em / 1em;
	box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.2);
	opacity: 0;
`

/**
 * Needs the scroll container for reference
 * make sure this shadow is in the header container
 * the header container must have a position property
 *
 * see content.js under learn for more info
 */
const HeaderShadow = ({ containerRef }) => {
	const shadowRef = useRef(null)

	useEffect(() => {
    const container = containerRef.current;
		handleShadow()
		container.addEventListener('scroll', handleShadow)
		return () => {
			container.removeEventListener('scroll', handleShadow)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const handleShadow = () => {
		let scrollTop = containerRef.current.scrollTop / 15
		shadowRef.current.style.opacity = scrollTop > 1 ? 1 : scrollTop
	}

	return (
		<ShadowWrapper>
			<Shadow ref={shadowRef} className="transition-short" />
		</ShadowWrapper>
	)
}

export default HeaderShadow
