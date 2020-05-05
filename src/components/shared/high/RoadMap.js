import React from 'react';
import styled from 'styled-components';
import Button from '../low/Button.js';
import { Icon } from "@chakra-ui/core";

const Container = styled.div`
background-color : ${props => props.color};
padding : 2em;
min-width: 331px;
max-height: 307px;
height: fit-content;
`
const InvertCon = styled.div`
display :flex;
justify-content: center;
`

const Line1 = styled.div `

width: ${props => (props.invert ? '12%' : '26%')};
height: 0px;
opacity: ${props => (props.invert ? '0.33' :'0.2')};
border: ${props => (!props.invert ? ' 2px solid #007BED' :'2px dashed #007BED')};
transform: ${props => (props.invert ? 'rotate(-34deg)' : 'rotate(-160deg)')};

margin-left: ${props => (props.invert ? '-3%' : '43%')};
margin-top: ${props => (props.invert ? '15%' : '')};
margin-right: ${props => (props.invert  ?'-2%' : '')};


`
const Line2 = styled.div `

width: ${props => (props.invert ? '16%' : '35%')};
height: 0px;
opacity: ${props => (props.invert ? '0.33' :'0.5')};
border: ${props => (props.invert ? ' 2px dashed #007BED' :'2px solid #007BED')};
transform: ${props => (props.invert ? 'rotate(69deg)' : 'rotate(-12.47deg)')};

margin-left: ${props => (props.invert ? '-11%' : '34%')};
margin-top: ${props => (props.invert ? '24%' : '')};
margin-right: ${props => (props.invert  ?'-12%' : '')};

`
const Line3 = styled.div `

width: ${props => (props.invert ? '20%' : '20%')};
height: 0px;
opacity: ${props => (props.invert ? '0.33' :'0.8')};
border: ${props => (props.invert ? ' 2px dashed #007BED' :'2px solid #007BED')};
transform: ${props => (props.invert ? 'rotate(-42deg)' : 'rotate(-159.44deg)')};
margin-left: ${props => (props.invert ? '-3%' : '34%')};
margin-top: ${props => (props.invert ? '28%' : '')};
margin-right: ${props => (props.invert ? '-4%' : '')};



`
const CardText = styled.div`

font-family: Open Sans;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 18px;
color: ${props => props.fontColor};
text-align: center;
margin :1em;
`
const CardText1 = styled.div`

text-align: center;
margin :1em;
color: ${props => props.fontColor};
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 10px;
line-height: 14px;

`
const ButtonContainer = styled.div`

text-align: center;
margin :1em;
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 10px;
line-height: 14px;

`
const StyledButton = styled(Button)`
  text-align: center;
margin :1em;
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 10px;
line-height: 14px;
background-color: #007BED;
width: 130px;
border-radius: 7px;
`
const Icon1 = styled.div`
width: 25.74px;
height: 25px;
width: ${props => (props.invert ? '41.18px ': '25.74px')};
height : ${props => (props.invert ? '40px' : '25px')};
background: #FFFFFF;
box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
border-radius: 30px;
margin-left: ${props => (props.invert ? '' : '35%')};
margin-top: ${props => (props.invert ? '10%' : '')};

`
const Icon2 = styled.div`
width: ${props => (props.invert ? '41.18px ': '30.88px')};
height : ${props => (props.invert ?'40px ' : '30px')};
background: #FFFFFF;
box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
border-radius: 30px;
margin-left: ${props => (props.invert ? '' : '68%')};
margin-top: ${props => (props.invert ? '33%' : '')};

`
const Icon3 = styled.div`
width: ${props => (props.invert ? '41.18px ': '36.03px')};
height : ${props => (props.invert ? '40px' : '35px')};

background: #FFFFFF;
box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
border-radius: 30px;
margin-left: ${props => (props.invert ? '' : '22%')};
margin-top: ${props => (props.invert ? '0%' : '')};
`
const Icon4 = styled.div`

width: 41.18px;
height: 40px;
left: 73px;
top: 80px;
background: #FFFFFF;
box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
border-radius: 30px;
margin-left: ${props => (props.invert ? '' : '52%')};
margin-top: ${props => (props.invert ?'18%' : '')};
`
const IconImg1 = styled.div`
width: 11.03px;
height: 14.71px;
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 18px;
text-transform: capitalize;
margin-left: 25%;
padding-top: 12%;
`
const IconImg4= styled.div`
width: 17.65px;
height: 23.53px;
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 27px;
text-transform: capitalize;

color: #000000;
padding-top :22%;
padding-left : 24%;
`
const IconImg2= styled.div`
width: 13.24px;
height: 17.65px;

font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 19px;
text-align: center;
text-transform: capitalize;
margin-left: 25%;
padding-top: 12%;
color: #000000;
`
const IconImg3= styled.div`
width: 15.44px;
height: 20.59px;
left: 10px;
top: 59px;

font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 17px;
line-height: 23px;
text-transform: capitalize;

margin-left: 25%;
padding-top: 12%;
color: #000000;
`
const Icon5 = styled.span`
background-color: #007BED;
border-radius: 50%;
padding : 1.5%;
width : 40px;
height : 40px;
margin-left : 2%;

`

const RoadMap = ({
  onClick,
  invert,
  invertColor
  }) => {
    var fontColor;
    var color ;
    if(invertColor){
      fontColor = "black"
      color = "white"
    }else {
      fontColor = "white"
      color = "#00498C"
    }
    if( !invert ){
    return (
        <Container color = {color}>
           <Icon1 invert = {invert}><IconImg1>🐱</IconImg1> </Icon1>
           <Line1></Line1>
           <Icon2 invert = {invert}><IconImg2>💃</IconImg2> </Icon2>
           <Line2></Line2>
           <Icon3 invert = {invert} ><IconImg3>🤟</IconImg3> </Icon3>
           <Line3></Line3>
           <Icon4 invert = {invert}><IconImg4>🎉</IconImg4> </Icon4>
            <CardText fontColor = {fontColor}>Javascript Roadmap</CardText>
            <CardText1 fontColor = {fontColor} >Explore your skills <Icon5><Icon name="arrow-forward" size ="16px" color = "white" onClick={onClick}></Icon></Icon5>  </CardText1>
        </Container>)
    }else {
      return (
        <Container color = {color}> 
        <InvertCon>
          <Icon4 invert = {invert}><IconImg4>🎉</IconImg4> </Icon4>
           <Line1 invert ={invert}></Line1>
           <Icon3 invert = {invert}><IconImg4>🤟</IconImg4> </Icon3>
           <Line2 invert ={invert}></Line2>
          
           <Icon2 invert = {invert}><IconImg4>💃</IconImg4> </Icon2>
           <Line3 invert ={invert}></Line3>
           
           <Icon1 invert = {invert}><IconImg4>🐱</IconImg4> </Icon1>
           </InvertCon>
            <CardText fontColor = {fontColor}> Learning Roadmap </CardText>
            <ButtonContainer>
            <StyledButton invert onClick={onClick} >Explore Modules</StyledButton>
            </ButtonContainer>
        </Container>)
    }
    
}

export default RoadMap;
