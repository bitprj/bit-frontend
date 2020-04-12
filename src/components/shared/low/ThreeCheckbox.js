import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import anime from 'animejs'

import Pass from '@material-ui/icons/Check'
import Fail from '@material-ui/icons/Close'
import None from '@material-ui/icons/CheckBoxOutlineBlank'

const selectColor = props => {
	switch (props.state) {
		case true: {
			return props.theme.pastel.green
		}
		case false: {
			return props.theme.pastel.red
		}
		default:
			return props.theme.offFont
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
		border: 0.1em solid
			${props => {
				if (props.state === 'NONE') return '#00000001'
				return `${selectColor(props)}66`
			}};
	}
`

/**
 * Uses three states as opposed to the traditional two-state checkbox
 * - true, false, undefined
 *
 * @param {*} param0
 */
const ThreeCheckbox = ({
	size,
	initialState,
	onChange = v => console.log(v)
}) => {
  const containerRef = useRef(null)
  
	const [state, setState] = useState(initialState)

	useEffect(() => {
		anime({
			targets: containerRef.current,
			scale: [0.8, 1],
			easing: 'easeOutElastic()',
			duration: 750
		})
		onChange(state)
	}, [state])

	const handleNextState = () => {
		switch (state) {
			case true: {
				setState(false)
				break
			}
			case false: {
				setState(undefined)
				break
			}
			default:
				setState(true)
				break
		}
	}

	const selectState = () => {
		switch (state) {
			case true: {
				return <Pass />
			}
			case false: {
				return <Fail />
			}
			default:
				return <None />
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
