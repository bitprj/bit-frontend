import React from 'react'
import styled from 'styled-components'

const RenderedButton = styled.button.attrs(props => {
	if (props.disabled) {
		if (props.invert) {
			props.dark = '#666666'
			props.light = '#aaaaaa'
		} else {
			props.dark = '#aaaaaa'
		}
	}
	return {
		dark: props.dark || props.theme.accent
	}
})`
  display: inline-block;
  position: relative;
  margin: ${props => (props.fullWidth ? '' : '0.5em')};
  padding: 0.75em 1.5em;

  ${props => (props.fullWidth ? 'width: 100%;' : '')}
  ${props =>
		props.rounder ? 'border-radius: 0.5em;' : 'border-radius: 0.25em;'}

  ${props =>
		!props.noOutline
			? `border: ${props.dark} solid 0.1em;`
			: 'border: transparent;'}

  ${props => {
		if (props.invert) {
			return `
      background-color: ${props.dark}};
      color: ${props.light || '#fff'};
      ${props.disabled ? '' : `box-shadow: 0 4px 14px 0 ${props.dark}77;`}`
		} else {
			return `
        background-color: ${props.light || 'transparent'};
        color: ${props.dark};`
		}
	}}

  text-align: center;
  outline: none;
  white-space: nowrap;
  transition: 0.2s ease all;
  font-size: inherit;
  user-select: none;

  ${props => (props.disabled ? 'pointer-events: none;' : '')}

  &:hover {
    ${props => {
			if (props.invert) return 'filter: brightness(110%);'
			return `box-shadow: inset 0 0 100em 100em ${
				props.dark ? props.dark + '16' : props.theme.accent + '16'
			}`
		}}
  }

  &:active {
    ${props => {
			if (props.invert) return 'filter: brightness(120%);'
			return `box-shadow: inset 0 0 100em 100em ${
				props.dark ? props.dark + '32' : props.theme.accent + '32'
			}`
		}}
  }
`

/**
 * THICC BUTTON
 *
 * limitations: specify all colors with hexcode 6 digits
 * @param {*} props
 */
const Button = props => {
	return (
		<RenderedButton
			className={props.className}
			dark={props.dark}
			light={props.light}
			invert={props.invert}
			fullWidth={props.fullWidth}
			disabled={props.disabled}
			rounder={props.rounder}
			noOutline={props.noOutline}
			onClick={props.onClick}
			{...props}
		>
			{props.children}
		</RenderedButton>
	)
}

export default Button
