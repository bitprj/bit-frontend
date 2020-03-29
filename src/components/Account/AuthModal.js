import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { RightPanel as LoginRightPanel } from './Login'
import { RightPanel as SignUpRightPanel } from './SignUp'

import DynamicModal from '../shared/containers/DynamicModal'
import TwoPanel from '../shared/containers/TwoPanel'

const StyledTwoPanel = styled(TwoPanel)`
	position: relative;
`

const ChangeForm = styled.div`
	position: absolute;
	right: 1.25em;
	bottom: 1.25em;

  color: ${props => props.theme.bgVariant};
	font-size: 75%;
  cursor: pointer;

	:hover {
		color: ${props => props.theme.accent};
	}
`

const AuthModal = ({ open, setOpen }) => {
	const themeContext = useContext(ThemeContext)

	const [isLogin, setIsLogin] = useState(true)

	return (
		<DynamicModal open={open} closed={() => setOpen(false)} scaleX={0.9}>
			<StyledTwoPanel
				fullSizeAxis
				firstCenterBoth
				firstStyle={{
					backgroundColor: themeContext.bgVariant,
					color: themeContext.fontInvert
				}}
				secondCenterBoth
				first={<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>}
				second={
					isLogin ? (
						<LoginRightPanel onClose={() => setOpen(false)} />
					) : (
						<SignUpRightPanel onClose={() => setOpen(false)} />
					)
				}
			>
				<ChangeForm
					className="transition-short"
					onClick={() => setIsLogin(!isLogin)}
				>
					{isLogin ? 'Not a user? Sign Up' : 'Login Instead'}
				</ChangeForm>
			</StyledTwoPanel>
		</DynamicModal>
	)
}

export default AuthModal
