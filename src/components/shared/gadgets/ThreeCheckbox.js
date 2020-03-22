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
			return props.theme.offFont
		}
		default:
			break
	}
}

const Container = styled.button`
	padding: 0.3em;
	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;

	color: white;
	border: 0.1em solid transparent;
	background-color: ${props => selectColor(props)};
	box-shadow: 0 4px 1.5em ${props => selectColor(props)}88;
  cursor: pointer;
  font-size: 170%;
  outline: 0;

  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  
  :focus {
    border: 0.1em solid ${props => {
			if (states[props.state] === 'NONE') return '#00000001'
			return `${selectColor(props)}66`
		}};
  }
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
				return <Pass fontSize="inherit" />
			}
			case 'FAIL': {
				return <Fail fontSize="inherit" />
			}
			case 'NONE':
				return <None fontSize="inherit" />
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
