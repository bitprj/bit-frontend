import styled from 'styled-components'

const ClampedText = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => props.clamp || 2};
  overflow: hidden;
`;

export default ClampedText
