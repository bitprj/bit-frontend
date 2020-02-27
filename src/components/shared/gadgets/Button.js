import React from 'react'
import styled from 'styled-components'
import anime from 'animejs'

const RenderedButton = styled.button.attrs(props => {
	if (props.disabled) {
		props.dark = '#444444'
		props.light = '#aaaaaa'
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

  border: ${props => props.dark} solid 0.1em;

  ${props => {
		if (props.invert)
			return `
      background-color: ${props.dark}};
      color: ${props.light || '#fff'};
      ${props.disabled ? '' : `box-shadow: 0 4px 14px 0 ${props.dark}77;`}`
		return `
      background-color: ${props.light || 'transparent'};
      color: ${props.dark};`
	}}

  text-align: center;
  outline: none;
  white-space: nowrap;
  transition: 0.2s ease all;
  font-size: inherit;

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

const ArtifactRoot = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
`

const RenderedArtifact = styled.div`
	width: ${props => props.size};
	height: ${props => props.size};
	position: absolute;
	// opacity: 0;
	border-radius: 50%;
	// transform: scale(0);
	background-color: #6666;
`

const Artifact = ({ size, coords, done }) => {
	const artifactRef = React.useRef(null)
	const x = coords[0]
	const y = coords[1]

	React.useEffect(() => {
		anime({
			targets: artifactRef.current,
			keyframes: [
				{ duration: 0, opacity: 0, scale: 0 },
				{ duration: 100, opacity: 1 },
				{ duration: 600, opacity: 0, scale: 2 },
				{ duration: 0, scale: 0 }
			],
			transformOrigin: [`${x}px ${y}px`, `${x}px ${y}px`],
			easing: 'easeOutQuad',
			complete: () => done()
		})
	}, [])
	return <RenderedArtifact ref={artifactRef} size={size} />
}

/**
 * THICC BUTTON
 *
 * limitations: specify all colors with hexcode 6 digits
 * @param {*} props
 */
const Button = props => {
	const buttonRef = React.useRef(null)
	const size = React.useRef()
	const [anims, setAnims] = React.useState([])

	React.useEffect(() => {
		size.current = `${buttonRef.current.offsetWidth}px`
	}, [])

	const animateClick = e => {
		const bounds = e.target.getBoundingClientRect()
		const x = e.clientX - bounds.left
		const y = e.clientY - bounds.top

		const nextAnims = anims.filter(anim => !anim.done)
		console.log(nextAnims)
		nextAnims.push({ coords: [x, y], done: false })
		setAnims(nextAnims)
	}

	return (
		<RenderedButton
			ref={buttonRef}
			className={props.className}
			dark={props.dark}
			light={props.light}
			invert={props.invert}
			fullWidth={props.fullWidth}
			disabled={props.disabled}
			rounder={props.rounder}
			onClick={() => {
				if (props.onClick) props.onClick()
				else if (props.clicked) props.clicked()
			}}
			// onMouseDown={animateClick}
		>
			{/* <ArtifactRoot>
				{anims.map((anim, i) => (
					<Artifact
						key={i}
						size={size.current}
						coords={anim.coords}
						done={() => (anim.done = true)}
					/>
				))}
			</ArtifactRoot> */}
			{props.children}
		</RenderedButton>
	)
}

export default Button
