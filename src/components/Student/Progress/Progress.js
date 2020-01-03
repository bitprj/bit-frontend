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

import Subject from './Subject';
import ModuleSection from './ModuleSection';
import SelectTopic from './SelectTopic';

const Page = styled.div`
	font-family: 'Source Sans Pro', sans-serif;
	width: 56.25rem;
	margin: 0 auto;
	margin-bottom: 10rem;
`

class Progress extends Component {
    state = {
        sectionProgress: '88%',
        sectionStatus: 'incomplete',
        moduleStatuses: [
            { status: 'complete' },
            { status: 'complete' },
            { status: 'incomplete' },
            { status: 'locked' }
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
                    moduleStatuses={this.state.moduleStatuses}
                />
                <SelectTopic />
            </Page>
        )
    }
}

export default Progress;