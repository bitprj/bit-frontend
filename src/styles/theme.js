/**
 * Make all colors normal hex (6 letters) for consistent
 * transparency usage across the app
 *
 * ex ${accent}77
 */

const constant = {
	font: '#000000',
	offFont: '#ebebeb',
	fontInvert: '#ffffff'
	// itemHoverShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)"
}

export const bitblue = {
	...constant,
	accent: '#007bed',
	accentVariant: '#9acfff', //86c5ff
	bg: '#0a192f',
	bgVariant: '#172A45',
	bgPage: '#f5faff'
}

export const palepink = {
	...constant,
	accent: '#db7093',
	accentVariant: '#ffb5cd',
	bg: '#320b18',
	bgVariant: '#451726',
	bgPage: '#fff5ff'
}

export const orange = {
	...constant,
	accent: '#ED6800',
	accentVariant: '#FFC69A',
	bg: '#2F190A',
	bgVariant: '#462B18',
	bgPage: '#FFF9F4'
}

export const black = {
	...constant,
	accent: '#565656',
	accentVariant: '#787878',
	bg: '#121212',
	bgVariant: '#232323',
	bgPage: '#efefef'
}

export default bitblue
