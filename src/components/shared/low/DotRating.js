import React from 'react'
import styled from 'styled-components'
import { isFunction } from 'lodash'

const Container = styled.div`
	line-height: 1em;
	height: 1em;

	${props =>
		props.fullWidth
			? `display: flex;
        align-items: center;`
			: ''}
`

const Dot = styled.div`
  display: inline-block;
  
  &:not(:last-child) {
    margin-right: ${props => props.gap};
  }

  width: ${props => props.dotSize};
  height: ${props => props.dotSize};
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

/**
 *
 * @param {filled} props
 */
const Rating = ({
	style,
	className,
	type,
	fullWidth,
	rating = 3,
	offRating,
	outOf = 5,
	upTo = true,
	filledColor,
	offFilledColor,
	offColor,
	dotSize = '0.3em',
	gap = '0.3em',
	callback
}) => {
	const renderedDots = [...Array(outOf)].map((_, index) => (
		<Dot
			key={`dots-${index}`}
			filled={upTo ? index < rating : index === rating - 1}
			offFilled={upTo ? index < offRating : index === rating - 1}
			type={type}
			fullWidth={fullWidth}
			filledColor={filledColor}
			offFilledColor={offFilledColor}
			offColor={offColor}
			callback={callback}
			dotSize={dotSize}
			gap={gap}
			onClick={() => isFunction(callback) && callback(index)}
		/>
	))

	return (
		<Container style={style} className={className} fullWidth={fullWidth}>
			{renderedDots}
		</Container>
	)
}

export default Rating
