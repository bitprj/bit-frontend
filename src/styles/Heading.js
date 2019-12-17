import styled from 'styled-components';
import Theme from './Theme';
import Media from './Media';
const { colors, fontSizes, fonts } = Theme;

const Heading = styled.h3`
	position: relative;
	display: flex;
	align-items: center;
	margin: 10px 0 40px;
	width: 100%;
	white-space: nowrap;
	font-size: ${fontSizes.h3};
	${Media.tablet`font-size: 24px;`};

	&:before {
		counter-increment: section;
		content: '0' counter(section) '.';
		margin-right: 10px;
		font-family: ${fonts.SFMono};
		font-weight: normal;
		color: ${colors.green};
		font-size: ${fontSizes.xlarge};
		position: relative;
		bottom: 4px;
		${Media.tablet`font-size: ${fontSizes.large};`};
	}

	&:after {
		content: '';
		display: block;
		height: 1px;
		width: 300px;
		background-color: ${colors.mediumGrey};
		position: relative;
		top: -5px;
		margin-left: 20px;
		${Media.desktop`width: 200px`};
		${Media.tablet`width: 100%;`};
		${Media.thone`margin-left: 10px;`};
	}
`;

export default Heading;
