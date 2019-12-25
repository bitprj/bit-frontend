import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../shared/Button'

const Window = styled.div`
    padding: .5rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
`

const Slide = styled.div`
`

const ControlSection = styled.div`
    margin-top: 80px;
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
            slides: [
                {
                    id: 123,
                    title: 'Concept 1',
                    content: 'In a synchronous programming model, things happen.'
                },
                {
                    id: 321,
                    title: 'Concept 2',
                    content: 'And that is, a lot of things.'
                },
                {
                    id: 456,
                    title: 'Concept 3',
                    content: 'Also there are those things.'
                },
                {
                    id: 654,
                    title: 'Concept 4',
                    content: 'Weeheehee.'
                }
            ],
            currentSlide: 0,
        }
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
                                <div>{slide.content}</div>
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