import React from 'react'
import styled from 'styled-components'
import { isFunction } from 'lodash'

const Container = styled.div`
	line-height: 1em;

	${props =>
		props.fullWidth
			? `display: flex;
        height: 1em;
        align-items: center;`
			: ''}
`

const Dot = styled.div`
  display: inline-block;
  margin-right: 0.4em;
  width: 0.3em;
  height: 0.3em;
  vertical-align: middle;
  ${props => (props.type !== 'SQUARE' ? 'border-radius: 0.3em' : '')}
  ${props => (props.fullWidth ? 'flex: 1;' : '')}
  ${props =>
		props.callback
			? props.filled || props.offFilled
				? 'cursor: pointer;'
				: 'cursor: default;'
			: ''}

  background-color: ${props => {
		if (props.filled) return props.filledColor || props.theme.accent
		if (props.offFilled)
			return props.offFilledColor || props.theme.accentVariant
		return props.offColor || props.theme.offFont
	}}
`
// 007BED

/**
 *
 * @param {filled} props
 */
const Rating = ({
	style,
	type,
	fullWidth,
	rating = 3,
	offRating,
	outOf = 5,
	filledColor,
	offFilledColor,
	offColor,
	callback
}) => {
	const renderedDots = [...Array(outOf)].map((dot, index) => (
		<Dot
			key={`dots-${index}`}
			filled={index < rating}
			offFilled={index < offRating}
			type={type}
			fullWidth={fullWidth}
			filledColor={filledColor}
			offFilledColor={offFilledColor}
			offColor={offColor}
			callback={callback}
			onClick={() => isFunction(callback) && callback(index)}
		/>
	))

	return (
		<Container style={style} fullWidth={fullWidth}>
			{renderedDots}
		</Container>
	)
}

export default Rating
