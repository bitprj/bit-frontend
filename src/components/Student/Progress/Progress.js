// import React from 'react';

// import Module from './Module';

// const Progress = (props) => {
//     return (
//         <div>
//             <h1>{props.topicTitle}</h1>
//             <div>{props.topicDescription}</div>
//             <Module />
//         </div>
//     )
// }

import React, { Component } from 'react';
import styled from 'styled-components';
import media from '../../global/media'

import Subject from './Subject';
import ModuleSection from './ModuleSection';
import SelectTopic from './SelectTopic';

const Page = styled.div`
	padding: 3% 5%;
	margin: 0 auto;
	font-size: 28px;

	${media.giant`font-size: 24px;`};
	${media.desktop`font-size: 20px;`};
	${media.tablet`font-size: 15px;`};
	${media.phablet`font-size: 13px;`};
	${media.phone`font-size: 13px;`};
`

class Progress extends Component {
	state = {
		sectionProgress: '22%',
		sectionStatus: 'incomplete',
		moduleContents: [
            {
				_id: "348u9eRWas0",
				name: "Programming Principles",
				image: "brickwall",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				status: 'complete'
			}, {
				_id: "348u9eRWas1",
				name: "Intro to Python",
				image: "brickwall",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				status: 'complete'
			}, {
				_id: "348u9eRWas2",
				name: "OOP",
				image: "brickwall",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				status: 'incomplete' 
			}, { 
				_id: "348u9eRWas3",
				name: "Data Structures",
				image: "brickwall",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				status: 'locked'
			}, {
				_id: "348u9eRWas4",
				name: "Data Structures",
				image: "github",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				status: 'locked'
			}
        ]
	}

    render() {
        return (
			<Page>
				<Subject
					sectionProgress={this.state.sectionProgress}
				/>
				<ModuleSection
					sectionStatus={this.state.sectionStatus}	
					moduleContents={this.state.moduleContents}
				/>
				<SelectTopic />
			</Page>
        )
    }
}

export default Progress;