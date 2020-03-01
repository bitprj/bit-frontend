import React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, GlobalStyleReset } from '../../styles/GlobalStyles'

const WithStyledTheme = props => {
	return (
		<ThemeProvider theme={props.theme}>
			<GlobalStyleReset />
			<GlobalStyle />
			{props.children}
		</ThemeProvider>
	)
}

const mapStateToProps = state => {
	return { theme: state.theme }
}

export default connect(mapStateToProps)(WithStyledTheme)
