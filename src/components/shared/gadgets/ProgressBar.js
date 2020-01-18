import styled from 'styled-components'

const ProgressBar = styled.div`
margin-top: 2em;
width: ${props => props.width || '90%'};
height: 0.5em;
background-color: ${props => props.theme.offFont};
position: relative;

&:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => props.progress || '69%'};
  background-color: ${props => props.theme.accent};
}
`;  

export default ProgressBar
