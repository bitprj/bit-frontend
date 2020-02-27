import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Login from '../Account/Login'
import setTheme from '../../redux/actions/theme'
import { logout } from '../../services/AccountService'
import { deauthenticate } from '../../redux/actions/account'
import { orange, palepink } from '../../styles/theme'

import SearchIcon from '@material-ui/icons/Search'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '../shared/gadgets/Button'
import Icon from '../shared/gadgets/Icon'
import IconLine from '../shared/gadgets/IconLine'

const contentHeight = '2.5em'

const Nav = styled.nav`
	font-size: 108%;
	padding: 0.8em 1em;
	box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`

const NavElement = styled.div`
	margin: 0 1em;
`
//^ line-height: ${contentHeight};

const StudentContainer = styled.div``

const VisitorContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
`

const SearchBarContainer = styled.div`
	position: relative;
	background-color: #f1f1f1;
	border-radius: ${contentHeight};
	display: flex;
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

const ProfPicWrapper = styled.div``

const MuiIconWrapper = styled.div`
	display: flex;
	align-items: center;
`

const NavButton = styled(Button)`
	margin: 0 0.5em;
	padding: 0.4em 0;
	width: 8em;
`

const styledLink = { color: 'black', textDecoration: 'none' }

const NavBar = ({ userType, onDeauthenticate, onSetTheme }) => {
	const history = useHistory()

	const [openLogin, setOpenLogin] = useState(false)

	const handleLogout = async () => {
		try {
			history.push('/')
			const response = await logout()
			if (response.logout) {
				onDeauthenticate()
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Nav>
				<NavElement style={{ height: contentHeight }}>
					<Link to={'/'}>
						<Icon
							alt="Bit Project"
							src={require('../../assets/logo/logo.svg')}
							width={contentHeight}
						/>
					</Link>
				</NavElement>

				{userType === 'STUDENT' ? (
					<>
						<NavElement>
							<Link style={styledLink} to={'/explore'}>
								Explore
							</Link>
						</NavElement>
						<NavElement>
							<Link style={styledLink} to={'/learn'}>
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
							<MuiIconWrapper>
								<NotificationsOutlinedIcon />
							</MuiIconWrapper>
						</NavElement>

						<NavElement onClick={handleLogout}>
							<IconLine icon={<AccountCircleIcon />}>Bob</IconLine>
						</NavElement>
					</>
				) : null}

				{userType === 'VISITOR' ? (
					<VisitorContainer>
						{/* <NavButton onClick={() => onSetTheme(palepink)}>
							Theme
						</NavButton> */}
						<NavButton invert onClick={() => setOpenLogin(true)}>
							Login
						</NavButton>
					</VisitorContainer>
				) : null}
			</Nav>
			<Login open={openLogin} setOpen={setOpenLogin} />
		</>
	)
}
const mapStateToProps = state => ({
	userType: state.account.userType
})

const mapDispatchToProps = dispatch => ({
	onDeauthenticate: () => dispatch(deauthenticate()),
	onSetTheme: theme => dispatch(setTheme(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
