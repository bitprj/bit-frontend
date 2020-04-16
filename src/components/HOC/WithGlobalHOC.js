import React from 'react'

import WithStyledTheme from './WithStyledTheme'
import WithChakraTheme from './WithChakraTheme'
import WithErrorBoundaries from './WithErrorBoundaries'
import WithAuthentication from './WithAuthentication'
import WithUserData from './WithUserData'
import WithNavBar from './WithNavBar'

const WithGlobalHOC = ({ children }) => (
	<WithStyledTheme>
		<WithChakraTheme>
			<WithAuthentication>
				<WithUserData>
					<WithNavBar>
						<WithErrorBoundaries>{children}</WithErrorBoundaries>
					</WithNavBar>
				</WithUserData>
			</WithAuthentication>
		</WithChakraTheme>
	</WithStyledTheme>
)

export default WithGlobalHOC
