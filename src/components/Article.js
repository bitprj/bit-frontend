import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
	fetchArticle,
	fetchUser,
	fetchUserArticles,
	followUser,
	unfollowUser,
	fetchUserFollowers
} from '../services/ArticleService'
import Button from './shared/low/Button.js'
import Avatar from 'react-avatar'
const ReactMarkdown = require('react-markdown')

const Container = styled.div`
	margin: 4em;
	display: flex;
	font-family: Apercu Pro;
`
const ArticleBody = styled.div`
	background: #ffffff;
`
const Image = styled.img`
height :400px;
width: 100%;
object-fit: cover
margin-bottom :1em;`

const AvatarPlaceHolder = styled.div`
	display: flex;
	margin-left: ${props => (!props.user ? '1.5em' : '')};
	margin-top: ${props => (!props.user ? '0.5em' : '')};
	margin-bottom: ${props => (props.user ? '0.5em' : '')};
	margin-top: ${props => (props.user ? '0.5em' : '')};
`

const Tags = styled.div`
	color: grey;
	display: flex;
	margin-left: ${props => (!props.user ? '2.5em' : '1em')};

	margin-right: ${props => (!props.user ? '' : '1em')};
	width: ${props => (!props.user ? '' : '70%')};
	margin-top: ${props => (!props.user ? '' : '0.5em')};
	font-size: 15px;
`

const Tag = styled.div`
	margin-right: 1em;
`

const ContentHolder = styled.div`
	margin-left: 2em;
	margin-right: 2em;
`
const Title = styled.div`
	font-weight: bold;
	margin-left: 1em;
	margin-top: 0.5em;
	font-size: ${props => (!props.user ? '36px' : '16px')};
	margin-right: 1em;
`

const AvatarName = styled.div`   
margin-top: ${props => (!props.user ? '0.8em' : '0.4em')};
margin-left: 0.5em;
margin-right: 0.5em
font-size: ${props => (props.user ? '13px' : '20px')};
font-weight: 600;
font-family: Apercu Pro;
color: ${props => (!props.user ? '#707070' : '')};
`
const UserInfo = styled.div`
	padding: 2em;
	margin-left: 2em;

	background: #ffffff;
`
const UserData = styled.div`
	font-family: Apercu Pro;
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	color: #000000;
`
const UserBio = styled.div`
	font-family: Apercu Pro;
	font-style: normal;
	font-size: 12px;
	color: #000000;
`
const UserTitle = styled.div`   
margin-top : 1em
font-family: Apercu Pro;
font-style: normal;
font-weight: 500;
font-size: 10px;
color: rgba(0, 0, 0, 0.5);
`

const AvatarGitHubUserName = styled.div`   
margin-right: 0.5em
font-size: 12px;
font-weight: normal;
`

const ButtonContainer = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	line-height: 14px;
`
const StyledButton = styled(Button)`
	margin: 1em 0 0 0;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	background-color: ${props => props.color};
	width: 100%;
	border-radius: 7px;
	font-weight: bold;
`

const UserArticles = styled.div`
	margin: 2em 0 0 2em;
	background: #ffffff;
	padding: 1em;
`
const UserArticlesContainer = styled.div``
const User = styled.div`
	width: 49em;
`

const AvatarUserDisplay = styled.div`
	display: flex;
`

const Article = props => {
	const [results, setResults] = useState('')
	const [userData, setUserData] = useState('')
	const [userArticles, setUserArtciles] = useState('')
	const [isUserFollowing, setUserFollowing] = useState(false)
	const id = props.match.params.id

	useEffect(() => {
		async function getData() {
			if (results.length == 0) {
				setResults(await fetchArticle(id))
				setUserData(await fetchUser(id))
				setUserArtciles(await fetchUserArticles(id))
			}
			var data = await fetchUserFollowers(id)
			var flag = false
			if (data != null) {
				for (var follower of data.followers) {
					if (follower.id == id) {
						flag = true

						break
					}
				}
				if (flag) setUserFollowing(true)
				else setUserFollowing(false)
			}
		}
		getData()
	})

	var i = 0
	var cardItem = []

	if (results != null) {
		if (results['tags'] != null) {
			for (i = 0; i < results.tags.length; i++) {
				cardItem.push(<Tag>#{results.tags[i].name}</Tag>)
			}
		}
	}

	var mainArticles = []
	if (userArticles != null) {
		if (userArticles['articles'] != null) {
			i = 0
			for (i = 0; i < userArticles.articles.length; i++) {
				var userArticlesMain = []

				userArticlesMain.push(
					<Title user>{userArticles.articles[i].title}</Title>
				)
				var userArticlesTag = []
				if (userArticles.articles[i]['tags'] != null) {
					var j = 0
					for (j = 0; j < userArticles.articles[i]['tags'].length; j++) {
						userArticlesTag.push('#')
						userArticlesTag.push(userArticles.articles[i].tags[j].name)
						userArticlesTag.push('\t  ')
					}
					userArticlesMain.push(
						<AvatarUserDisplay>
							<Tags user>{userArticlesTag}</Tags>{' '}
							<Avatar
								size="2em"
								name={userData.name}
								src={userData.profile}
								round
							/>{' '}
						</AvatarUserDisplay>
					)

					mainArticles.push(<UserArticles>{userArticlesMain}</UserArticles>)
				}
			}
		}
	}

	var text = ''
	var color = ''

	if (isUserFollowing) {
		text = 'Following'
		color = '#4EC700;'
	} else {
		text = ' + Follow'
		color = '#007BED;'
	}

	return (
		<Container>
			<ArticleBody>
				<Image src={results.cover_image}></Image>
				<Tags>{cardItem}</Tags>
				<Title>{results.title}</Title>
				<AvatarPlaceHolder>
					<Avatar
						size="3em"
						name={userData.name}
						src={userData.profile}
						round
					/>
					<AvatarName>{userData.name}</AvatarName>
				</AvatarPlaceHolder>
				<ContentHolder>
					<ReactMarkdown source={results.content} />
				</ContentHolder>
			</ArticleBody>
			<User>
				<UserInfo>
					<AvatarPlaceHolder user>
						<Avatar
							size="2em"
							name={userData.name}
							src={userData.profile}
							round
						/>
						<AvatarName user>
							{userData.name}
							<AvatarGitHubUserName>
								{' '}
								@{userData.github_username}{' '}
							</AvatarGitHubUserName>
						</AvatarName>
					</AvatarPlaceHolder>
					<UserBio>{userData.bio}</UserBio>
					<UserTitle>Location</UserTitle>
					<UserData>{userData.location}</UserData>
					<UserTitle>Occupation</UserTitle>
					<UserData>{userData.occupation}</UserData>
					<UserTitle>Joined</UserTitle>
					<UserData>{userData.day_joined}</UserData>
					<ButtonContainer>
						<StyledButton
							invert
							color={color}
							onClick={() => {
								async function getUserFollow() {
									if (isUserFollowing == true) {
										await unfollowUser(id)
										setUserFollowing(false)
									} else {
										await followUser(id)

										setUserFollowing(true)
									}
								}
								getUserFollow()
							}}
						>
							{' '}
							{text}{' '}
						</StyledButton>
					</ButtonContainer>
				</UserInfo>

				<UserArticlesContainer>{mainArticles}</UserArticlesContainer>
			</User>
		</Container>
	)
}

export default Article
