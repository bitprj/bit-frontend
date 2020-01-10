import React, { Component } from 'react';
import styled from 'styled-components';
import media from '../../global/media'

import Subject from './CurrentTrack';
import ModuleSection from './CurrentTopics';
import SelectTopic from './SelectTopic';

const Page = styled.div`
	padding: 3% 5%;
	margin: 0 auto;
	font-size: 28px;

	${media.giant`font-size: 18px;`};
	${media.desktop`font-size: 16px;`};
	${media.tablet`font-size: 14px;`};
	${media.phablet`font-size: 13px;`};
	${media.phone`font-size: 13px;`};
`

class Progress extends Component {
    render() {
        return (
			<Page>
				<Subject />
				<ModuleSection />
				<SelectTopic />
			</Page>
        )
    }
}

export default Progress;