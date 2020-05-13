import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { connect } from 'react-redux'

import DynamicModal from '../../shared/containers/DynamicModal'
import TwoPanel from '../../shared/containers/TwoPanel'
import DotRating from '../../shared/low/DotRating'
import Button from '../../shared/low/Button'
import ImgAndContent from '../../shared/low/ImgAndContent'
import { sizes } from '../../../styles/media'

import { chooseProjects } from '../../../redux/actions/studentData'
import withApiCache, { CACHE_ACTIVITY } from '../../HOC/WithApiCache'

const WacProject = withApiCache([CACHE_ACTIVITY])(
	({ wac_data: [project], setSelectedProject,selectedProject }) => {
		const { image, name, summary, time } = project ?? {}
		//setting default project
		if(project!=undefined){
			if(selectedProject==null){
				setSelectedProject(project)
			}
		}
		return (
			<ImgAndContent
				className="student-choose-projects"
				imgWidthEms="6"
				imgURL={image}
				title={name}
				time={time}
				hover
				shadow
				onClick={() => {
					setSelectedProject(project)
				}}
			/>
		)
	}
)

const StyledTwoPanel = styled(TwoPanel)`
	font-size: 80%;
`

const LeftPanel = styled.div`
	margin: 0 auto;
	padding: 1.5em 2.5em 2.5em;
	background-color: ${props => props.theme.bgVariant};
	color: ${props => props.theme.fontInvert};
	height: auto;
	min-height:100%;
	display: flex;
	flex-direction: column;
`
const RightPanel = styled.div`
	margin: 0 auto;
	height:100%;
	padding: 4em 4em 4em 4em;
	background-color: white;
	display: flex;
	flex-direction: column;
`

const FullImg = styled.div`
	width: 100%;
	height: 100%;
	background: transparent url(${props => props.img}) no-repeat;
	background-size: 100%;
	background-position: center;
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		background-size: 100% auto;
	}

	@media screen and (orientation: landscape) and (max-height: 500px) {
		background-size: 100% auto;
	}
`
const Nbsp = styled.p`
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		display: none;
	}
`
const FinalProject = ({
	open,
	closed,
	moduleId,
	projectIds,
	chosenProjectIds,
	onChooseProjects
}) => {
	const themeContext = useContext(ThemeContext)

	const [selectedProject, setSelectedProject] = useState(null)

	const isChosenAlready = chosenProjectIds?.find(
		p => p.id === selectedProject?.id
	)
	const handleClickButton = () => {
		if (!chosenProjectIds) return

		if (isChosenAlready) {
			onChooseProjects(
				moduleId,
				chosenProjectIds.filter(p => p.id !== selectedProject.id)
			)
		} else {
			onChooseProjects(
				moduleId,
				chosenProjectIds.concat([{ id: selectedProject.id }])
			)
		}
		closed()
	}

	/**
	 * LIST VIEW
	 */
	const projects = (
		<div style={{ fontSize: '65%' }}>
			{projectIds?.map((project, index) => {
				return (
					<WacProject
						key={`learn-project-${index}`}
						id={project.id}
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
					/>
				)
			})}
		</div>
	)
	const choose = (
		<div>
			<Nbsp>&nbsp;</Nbsp>
			<h2 style={{ marginBottom: 0 }}>Choose a Project</h2>
			<p>
				Choose a Project to practice your newfound knowledge in interactive,
				challenging projects.
			</p>
			{projects}
		</div>
	)
	/**
	 * DESCRIPTION VIEW
	 */
	const description = (
		// for author just add one more column next to select button
		// selectedProject?.authors
		<div>
			<FullImg style={{height:"100%"}} img={selectedProject?.image}/>
			<h2 style={{ margin: 0, paddingTop: "5%" }}>{selectedProject?.name}</h2>
			<p style={{ marginBottom: '1em', fontSize:"70%",color:"black" }}>{selectedProject?.description}</p>
			<div style={{display:'flex'}}>
			<div style={{width:"50%"}}>
			<div style={{marginBottom:"2%"}}>Difficulty</div>
			<DotRating rating={3} offColor={themeContext.accentVariant} dotSize={'0.4em'} gap={"0.5em"} />
			</div>
			<div style={{width:"50%"}}>
			{selectedProject?.time && (
				<div>Estimated time</div>
			)}
			<span style={{ fontWeight: 'bold', fontSize:'90%' }}>{selectedProject?.time}</span>
			</div>
			</div>
			<div style={{ flexGrow: '1', display: 'flex', alignItems: 'flex-end',marginTop:"7%" }}>
				<Button invert fullWidth onClick={handleClickButton}>
					{isChosenAlready ? 'Remove Lab' : 'Select Lab'}
				</Button>
			</div>
		</div>
	)

	const leftPanel = <LeftPanel>{choose}</LeftPanel>
	const rightPanel = <RightPanel>{description}</RightPanel>

	return (
		<DynamicModal open={open} closed={closed} ratio={0.43}>
			<StyledTwoPanel fullSizeAxis first={leftPanel} second={rightPanel} ratio={0.41}/>
		</DynamicModal>
	)
}

const mapDispatchToProps = dispatch => ({
	onChooseProjects: (moduleId, project) =>
		dispatch(chooseProjects(moduleId, project))
})

export default connect(null, mapDispatchToProps)(FinalProject)