import React from 'react'

import WithStyledTheme from './WithStyledTheme'
import WithChakraTheme from './WithChakraTheme'
import WithErrorBoundaries from './WithErrorBoundaries'
import WithAuthentication from './WithAuthentication'
import WithNavBar from './WithNavBar'

const WithGlobalHOC = ({ children }) => (
	<WithStyledTheme>
		<WithChakraTheme>
			<WithAuthentication>
				<WithNavBar>
					{process.env.NODE_ENV === 'production' ? (
						children
					) : (
						<WithErrorBoundaries>{children}</WithErrorBoundaries>
					)}
				</WithNavBar>
			</WithAuthentication>
		</WithChakraTheme>
	</WithStyledTheme>
)

export default WithGlobalHOC
