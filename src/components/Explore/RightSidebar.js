import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  padding-top: 2em;
  padding-left: 2em;
  padding-right:2em;
  height:100vh;
  width:30vw;
  @media screen and (min-width: 0px) and (max-width: 500px) {
    display: none;
  }
`



const RightSidebar = props => {
  return (
    <Container>
    </Container>
  )
}

export default RightSidebar
