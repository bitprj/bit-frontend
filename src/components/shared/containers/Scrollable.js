import React, { useRef } from 'react'
import styled from 'styled-components'

import HeaderShadow from '../gadgets/HeaderShadow'

const Container = styled.div``

const Scrollable = ({
	children,
	className,
	id,
	topType,
	topCallback,
	bottomType,
	bottomCallback
}) => {
	const containerRef = useRef(null)

	return (
		<Container
			id={id}
			ref={containerRef}
			className={`${className || ''} low-profile-scrollbar only-hover`}
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
