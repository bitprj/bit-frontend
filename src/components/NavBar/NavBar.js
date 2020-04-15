import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { login } from '../../services/AccountService'
import { deauthenticate } from '../../redux/actions/account'

import ProfPic from '../shared/low/ProfPic'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import Button from '../shared/low/Button'
import Icon from '../shared/low/Icon'

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
	${props => (props.isStudent ? '' : 'flex-grow: 1;')}
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
	padding: 0.4em 1em;
	font-size: 80%;
`

const styledLink = { color: 'black', textDecoration: 'none' }

const NavBar = ({ meta, name, image }) => {
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

				{meta?.studentId && (
					<>
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

				{meta?.teacherId && (
					<NavElement>
						<Link style={styledLink} to="/grade/">
							Grading
						</Link>
					</NavElement>
				)}

				{meta?.studentId || meta?.teacherId ? (
					<AlignRight isStudent={meta?.studentId}>
						<NavElement onClick={deauthenticate}>
							<div style={{ cursor: 'pointer' }}>
								<ProfPic
									src={image}
									name={name?.replace(/ .*/, '')}
									size="2em"
								/>
							</div>
						</NavElement>
					</AlignRight>
				) : null}

				{!meta?.studentId && !meta?.teacherId ? (
					<AlignRight>
						<NavButton invert onClick={login}>
							Login With GitHub
						</NavButton>
					</AlignRight>
				) : null}
			</Nav>
		</>
	)
}
const mapStateToProps = state => {
	const {
		account: { meta, user }
	} = state

	const { name, image } = user ?? {}

	return {
		meta,
		name,
		image
	}
}

export default connect(mapStateToProps)(NavBar)
