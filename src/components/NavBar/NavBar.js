import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import AuthModal from '../Account/AuthModal'
import Logout from '../Account/Logout'
import setTheme from '../../redux/actions/theme'
import { orange, palepink } from '../../styles/theme'

import ProfPic from '../shared/gadgets/ProfPic'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '../shared/gadgets/Button'
import Icon from '../shared/gadgets/Icon'

const contentHeight = '2.2em'

const Nav = styled.nav`
	padding: 0.8em 1em;
	box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
	display: flex;
	align-items: stretch;
	flex-wrap: wrap;
`

const NavElement = styled.div`
	margin: 0 1em;
	display: flex;
	align-items: center;
`

const AlignRight = styled.div`
	${props => (props.userType !== 'STUDENT' ? 'flex-grow: 1;' : '')}
	display: flex;
	justify-content: flex-end;
`

const SearchBarContainer = styled.div`
	position: relative;
	background-color: #f1f1f1;
	border-radius: ${contentHeight};
	display: flex;
	width: 100%;
`

const SearchBar = styled.input`
	width: 100%;
	line-height: ${contentHeight};
	border: none;
	background: none;
	outline: none;
	padding-left: 1.25em;
	padding-right: ${contentHeight};
	cursor: text;
`

const SearchIconWrapper = styled.div`
	position: absolute;
	width: ${contentHeight};
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 0;
	cursor: pointer;
`

const VerticalAlign = styled.div`
	display: flex;
	align-items: center;
`

const NavButton = styled(Button)`
	margin: 0 0.5em;
	padding: 0.4em 0;
	width: 8em;
`

const styledLink = { color: 'black', textDecoration: 'none' }

const NavBar = ({ firstName, image, userType, onSetTheme, location }) => {
	const authModal = useMemo(() => {
		const search = new URLSearchParams(location.search)
		return search.get('authModal')
	}, [location.search])

	const [openAuthModal, setOpenAuthModal] = useState(authModal == 'true')
	const [logout, setLogout] = useState(null)

	useEffect(() => {
		if (logout) {
			setLogout(false)
		}
	}, [logout])

	return (
		<>
			<Nav id="nav-bar">
				<NavElement style={{ height: contentHeight }}>
					<Link to="/">
						<Icon
							alt="Bit Project"
							src={require('../../assets/logo/logo.svg')}
							sharp
							width={contentHeight}
						/>
					</Link>
				</NavElement>

				{userType === 'STUDENT' && (
					<>
						{/* <NavElement>
							<Link style={styledLink} to={'/dashboard/'}>
								Dashboard
							</Link>
						</NavElement> */}
						<NavElement>
							<Link style={styledLink} to="/explore/">
								Explore
							</Link>
						</NavElement>
						<NavElement>
							<Link style={styledLink} to="./">
								Community
							</Link>
						</NavElement>

						<NavElement style={{ flex: '1' }}>
							<SearchBarContainer>
								<SearchBar />
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
							</SearchBarContainer>
						</NavElement>

						<NavElement>
							<VerticalAlign>
								<NotificationsOutlinedIcon />
							</VerticalAlign>
						</NavElement>
					</>
				)}

				{userType === 'TEACHER' && (
					<NavElement>
						<Link style={styledLink} to="/grade/">
							Grading
						</Link>
					</NavElement>
				)}

				{userType === 'STUDENT' || userType === 'TEACHER' ? (
					<AlignRight userType={userType}>
						<NavElement onClick={() => setLogout(true)}>
							<div style={{ cursor: 'pointer' }}>
								<ProfPic src={image} iconSize={contentHeight}>
									{firstName}
								</ProfPic>
							</div>
						</NavElement>
					</AlignRight>
				) : null}

				{userType === 'VISITOR' ? (
					<AlignRight>
						{/* <NavButton onClick={() => onSetTheme(palepink)}>
							Theme
						</NavButton> */}
						<NavButton invert onClick={() => setOpenAuthModal(true)}>
							Login
						</NavButton>
					</AlignRight>
				) : null}
			</Nav>
			<AuthModal open={openAuthModal} setOpen={setOpenAuthModal} />
			{logout && <Logout />}
		</>
	)
}
const mapStateToProps = state => {
	const {
		account: { userType },
		studentData: { firstName, image }
	} = state

	return {
		firstName,
		userType,
		image
	}
}

const mapDispatchToProps = dispatch => ({
	onSetTheme: theme => dispatch(setTheme(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
