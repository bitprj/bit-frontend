import React, { Component } from 'react'

// use like so:
// const [, setError] = useState(null)
//
// setError(() => { // trigger rerender and throw error from trycatch
//   throw error
// })
class WithErrorBoundaries extends Component {
	constructor(props) {
		super(props)
		this.state = { error: null, errorInfo: null }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { error: true, errorInfo: error }
	}

	componentDidCatch(error, errorInfo) {
		console.log(error)
		// Catch errors in any components below and re-render with error message
		// this.setState({ error, errorInfo })
		// You can also log error messages to an error reporting service here
	}

	render() {
		if (this.state.error) {
			console.log(this.state.error.response)
			// Error path
			return (
				<>
					<h2>Something went wrong.</h2>
					{/* <details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details> */}
				</>
			)
		}

		return this.props.children
	}
}

export default WithErrorBoundaries
