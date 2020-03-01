import React from 'react'

import WithStyledTheme from './WithStyledTheme'
import WithErrorBoundaries from './WithErrorBoundaries'
import WithAuthentication from './WithAuthentication'
import WithNavBar from './WithNavBar'

const WithGlobalHOC = ({ children }) => (
	<WithStyledTheme>
		<WithAuthentication>
			<WithNavBar>
				<WithErrorBoundaries>
					{/*                */ children /*                */}
				</WithErrorBoundaries>
			</WithNavBar>
		</WithAuthentication>
	</WithStyledTheme>
)

export default WithGlobalHOC
