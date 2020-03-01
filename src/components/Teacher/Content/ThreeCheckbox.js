import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import anime from 'animejs'

import Pass from '@material-ui/icons/Check'
import Fail from '@material-ui/icons/Close'
import None from '@material-ui/icons/CheckBoxOutlineBlank'

const selectColor = props => {
	switch (states[props.state]) {
		case 'PASS': {
			return props.theme.pastel.green
		}
		case 'FAIL': {
			return props.theme.pastel.red
		}
		case 'NONE': {
			return '#e4e4e4'
		}
		default:
			break
	}
}

const Container = styled.div`
	width: ${props => props.size};
	height: ${props => props.size};
	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;

	color: white;
	background-color: ${props => selectColor(props)};
	box-shadow: 0 4px 1.5em ${props => selectColor(props)}88;
	cursor: pointer;

	transition: background-color 0.2s ease, box-shadow 0.2s ease;
`

const states = ['NONE', 'PASS', 'FAIL']

const ThreeCheckbox = ({ size }) => {
	const containerRef = useRef(null)

	const [state, setState] = useState(0)

	useEffect(() => {
		anime({
			targets: containerRef.current,
			scale: [0.8, 1],
			easing: 'easeOutElastic()',
			duration: 750
		})
	}, [state])

	const handleNextState = () => {
		if (state + 1 === states.length) setState(0)
		else setState(state + 1)
	}

	const selectState = () => {
		switch (states[state]) {
			case 'PASS': {
				return <Pass />
			}
			case 'FAIL': {
				return <Fail />
			}
			case 'NONE':
				return <None />
			default:
				break
		}
	}

	return (
		<Container
			ref={containerRef}
			size={size || '3em'}
			state={state}
			onClick={handleNextState}
		>
			{selectState()}
		</Container>
	)
}

export default ThreeCheckbox
