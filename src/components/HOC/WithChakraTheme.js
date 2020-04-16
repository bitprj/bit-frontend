import React from 'react'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'

export const chakraTheme = {
	accent: '#007bed',
	accentVariant: '#9acfff', //86c5ff
	mild: '#00498c',
	bg: '#0a192f',
	bgVariant: '#172A45',
	bgPage: '#f5faff'
}

export const customTheme = {
	...theme,
	fonts: {
		body: 'Open Sans',
		heading: 'Poppins',
		monospace: 'Source Code Pro'
	},
	colors: {
		...theme.colors,
		theme: chakraTheme
	}
}

const WithChakraTheme = ({ children }) => {
	return (
		<ThemeProvider theme={customTheme}>
			{/* <CSSReset /> */}
			{children}
		</ThemeProvider>
	)
}

export default WithChakraTheme
