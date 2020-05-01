import React from 'react';
import styled from 'styled-components'
import Button from '../low/Button'
import IconLine from '../low/IconLine'
import AvatarGroup from './AvatarGroup'
import Avatar from 'react-avatar'
import LightningBoltIcon from '../../../assets/icons/PageHeaderAssets'

/*
 * input props:
 *
 * - pageView: (String) Specifies current page where PageHeader is rendered. One of {'Explore','World','Module'}
 * - titleText = (String) Text in title field of component
 * - bodyText = (String) Text in body field of component
 * - lastCommitTime = (String) Time of last commit. Will render on World, Module pages only
 * - currSkill = (String) digit representing current student progress in specified field. Will render on Module page only
 * -  maxSkill = (String) digit representing maximum student progress in specified field. Will render on Module pages only
 * - trackName = (String) name of current track student is enrolled .Will render on Module pages only
 * - authors = (Array<String>) list of authors contributing. Will render on World, Module pages only
 * - emoji = (Component) Emoji component to be rendered.
 * - emojiBGColor = (String) background color of emoji component
 * - buttonTxt = (String) text to be displayed on cgit omponent button. Will render on World, Module pages only

 * Example usage:
 * 			<PageHeader
				pageView = "Module"
				titleText = "Beginner Javascript"
				bodyText = "Once relegated to the browser as one of the 3 core technologies of the web, JavaScript can now be found almost anywhere you find code."
				lastCommitTime = "May 1st, 2020"
				currSkill = "1"
				maxSkill = "5"
				trackName = "Beginner Javascript"
				authors = {["Daniel Smith", "David Johnson", "Patricia Williams" , "Patrick Brown"]}
				emoji = {<PartyIcon/>}
				emojiBGColor = "white"
				buttonTxt = "Start"
			/>
 */

const PageHeaderContainer = styled.div`
  padding: 2em 2em 2em 2em;
  width: 45em;
  position: relative;
	
	margin-top: 3%;
	margin-left: 2%
	
	border: solid rgba(255,232,112, 0.8);
  border-radius: 0.4em;
  background-size: 100% auto;
  background-position: bottom right;
  
  background-color: #FFFFFFF
  box-shadow: 0.5em 0.5em rgba(255,232,112, 0.8);
`

const ImgBackGround = styled.div`
	${props =>
	props.pageView === 'Explore'
		? `
      background-color: ${props.emojiBGColor};
			height:6.5em;
			width:6.5em;`
		: `
      background-color: ${props.emojiBGColor};
      box-shadow: 0 0 20px #ffe76f;
			height:5em;
			width:5em;`
}
	margin-top: 2.5%;
	border-radius: 0.4em;
	display: flex;
	align-items: center;
	justify-content:center;
`
const TextBlock = styled.div`
	display: inline-block;
	padding-left: 2em;
	width: 38em;
`
const ImgTitleWrapper = styled.div`
	display: flex;
	align-items: top;
`

const FootNoteWrapper = styled.div`
	display:flex;
	justify-content:space-between;
	align-items: center;
`

const FieldsWrapper = styled.div`
	width: 100%;
	height: 100%;
`

const FootNote = styled.small`
	font-size:0.6em;
`

const ProgressText = styled.p`
	font-size: 0.6em;
	margin-top: -2em;
`

const handleClick = () =>{
	alert('Not Yet Implemented');
}

const PageHeader = props => {
	return (
		<PageHeaderContainer>
			<FieldsWrapper>
				<ImgTitleWrapper>
					<ImgField {...props}/>
					<TitleField {...props}/>
				</ImgTitleWrapper>
				{props.pageView !== 'Explore' ? <FootNoteField {...props}/> : null}
			</FieldsWrapper>
		</PageHeaderContainer>
	)
};

const FootNoteField = props =>{
	return(
		<FootNoteWrapper>
			<AvatarGroup size="1.5em">
				{props.authors ? props.authors.map((item) =>(<Avatar key = {item} name = {item}/>)) : null}
			</AvatarGroup>
			<IconLine icon = {<LightningBoltIcon/>}>
				<FootNote>Last Commit</FootNote>
			</IconLine>
			<FootNote>{props.lastCommitTime}</FootNote>
			<Button
				style = {{lineHeight: '0.2em'}}
				onClick = {handleClick}
				light = "rgba(255,232,112, 0.8)"
				noOutline = "true"
				dark = "black">
				<b>{props.buttonTxt}</b>
			</Button>
		</FootNoteWrapper>
	);
}


const ImgField = props =>{
	return(
		<ImgBackGround {...props}>
			{props.emoji}
		</ImgBackGround>
	);
}

const TitleField = props => {
	return(
		<TextBlock>
			<h1>
				{props.titleText}
			</h1>
			{props.pageView === 'Module' ? <ProgressTrackField {...props}/> : null}
			<p>
				{props.bodyText}
			</p>
		</TextBlock>
	)
}

const ProgressTrackField = props => {
	return(
		<ProgressText><b>{props.currSkill}</b> of {props.maxSkill} skills in <b>{props.trackName}</b> Track</ProgressText>
	)
}

export default PageHeader;
