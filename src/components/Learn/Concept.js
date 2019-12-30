import React, { Component } from 'react';
import styled from 'styled-components';
import RichTextToReact from 'rich-text-to-react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '../shared/Button'

import { RenderingOptions } from '../../services/RenderingOptions';
import ContentfulService from '../../services/ContentfulService';

const Window = styled.div`
    padding: .5rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: white;
    max-width: 800px
    margin: 2rem;
`

const Slide = styled.div`
`

const ControlSection = styled.div`
    text-align: center;
`

const DotArea = styled.div`
    margin-top: 15px;
`

const Dot = styled.div`
    display: inline-block;
    width: 7px;
    height: 7px;
    min-width: 7px;
    margin: 5px;
    border-radius: 50%;
    background: #efefef;
    transition: background 0.5s ease;

    &.dot-picked {
        background-color: #0070f3;
    }
`

class Concept extends Component {
    constructor() {
        super();
        this.state = {
            slides: [],
            currentSlide: 0,
        }

        this.service = new ContentfulService();
    }

    componentDidMount() {
        this.service.getConceptContent('1gzvGY8AuGVhyxwAirTDrZ').then(data => {
            this.setState({
                slides: data
            })
        })
    }

    dotClickedHandler = (index) => {
        this.setState({
            currentSlide: index,
            renderSlides: this.state.slides.map((slide, index) => {
                return (
                    (this.state.currentSlide === index) ?
                        <Slide key={`slide - ${slide.id} `}>
                            {slide.title}
                        </Slide>
                        : null
                )
            })
        });
    }

    moveClickedHandler = (step) => {
        const destination = this.state.currentSlide + step;
        if (destination >= 0 && destination < this.state.slides.length) {
            this.setState({
                currentSlide: destination
            })
        };
    }

    render() {
        return (
            <Window>
                {this.state.slides.map((slide, index) => {
                    return (
                        (index === this.state.currentSlide) ?
                            <Slide key={`slide-${slide.id}`}>
                                <h3>{slide.title}</h3>
                                {/* <div>{slide.content}</div> */}
                                <RichTextToReact document={slide.content} options={RenderingOptions} />
                            </Slide>
                            : null
                    )
                })}

                <ControlSection>
                    <Button buttonState="< Prev" class_name="button" click={() => this.moveClickedHandler(-1)} />
                    <Button buttonState="Next >" class_name="button invert" click={() => this.moveClickedHandler(1)} />

                    <DotArea>
                        {this.state.slides.map((slide, index) => {
                            const picked = (index === this.state.currentSlide) ? "dot-picked" : null;
                            return (
                                <Dot key={`dot-${slide.id}`} className={picked} onClick={() => this.dotClickedHandler(index)}></Dot>
                            )
                        })}
                    </DotArea>
                </ControlSection>
            </Window>
        )
    }
}

export default Concept;