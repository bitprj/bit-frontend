import React, {Component} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1em;
  width: 18em;
  @media screen and (min-width: 0px) and (max-width: 500px) {
    display: none;
  }
  
  border-radius:0.2em;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Picture = styled.img`
	height: 4em;
	width: 4em;
	margin-right: 2em;
	border-radius: 50%;
`

const UserName = styled.h1`
	padding-top: 0;
	padding-bottom: 0;
	margin-top: 0;
	margin-bottom: 0;
`

class User extends Component {
	render() {
		return (
			<Container>
				<Picture src = {this.props.ImgLink}/>
				<div>
					<UserName>
						{this.props.name}
					</UserName>
					{this.props.childComponent}
				</div>
			</Container>
		)
	}
}

export default User
