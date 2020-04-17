import React, { useRef } from 'react'
import styled from 'styled-components'

import HeaderShadow from '../low/HeaderShadow'

const Container = styled.div`
	height: ${props => props.height};
`

const Scrollable = ({
	idName,
	className,

	children,
	topType,
	topCallback,
	bottomType,
	bottomCallback,

	height = 'auto',
	arrowNav = true
}) => {
	const containerRef = useRef(null)

	return (
		<Container
			id={idName}
			ref={containerRef}
			className={`${className || ''} low-profile-scrollbar only-hover`}
			height={height}
			onKeyDown={e => {
				if (!arrowNav) {
					switch (e.key) {
						case 'ArrowUp':
						case 'ArrowLeft':
						case 'ArrowRight':
						case 'ArrowDown':
						case ' ':
							e.preventDefault()
							break
						default:
							break
					}
				}
			}}
		>
			<HeaderShadow
				containerRef={containerRef}
				type={topType}
				innerOnClick={topCallback}
			/>
			{children}
			<HeaderShadow
				containerRef={containerRef}
				reverse
				type={bottomType}
				innerOnClick={bottomCallback}
			/>
		</Container>
	)
}

export default Scrollable
