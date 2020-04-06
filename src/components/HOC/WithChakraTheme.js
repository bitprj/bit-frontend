import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

const WithChakraTheme = ({ children }) => {
	return (
		<ThemeProvider>
			{/* <CSSReset /> */}
			{children}
		</ThemeProvider>
	)
}

export default WithChakraTheme
