import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../Button'

const Window = styled.div`
    padding: 1rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
`

const Slide = styled.div`
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
`

class Modal extends Component {
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
                                {slide.title} - {slide.content}
                            </Slide>
                            : null
                    )
                })}

                <div className="control">
                    <Button name="< Prev" class_name="button" click={() => this.moveClickedHandler(-1)} />
                    <Button name="Next >" class_name="button invert" click={() => this.moveClickedHandler(1)} />

                    <div className="dot-area">
                        {this.state.slides.map((slide, index) => {
                            const picked = (index === this.state.currentSlide) ? "dot-picked" : null;
                            return (
                                <Dot key={`dot-${slide.id}`} className={picked} onClick={() => this.dotClickedHandler(index)}>

                                    <style jsx>{`
                                        .dot-picked {
                                            background-color: #0070f3;
                                        }
                                    `}</style>
                                </Dot>
                            )
                        })}

                        <style jsx>{`
                            .control {
                                margin-top: 80px;
                                text-align: center;
                            }
                            .dot-area {
                                margin-top: 15px;
                            }
                        `}</style>
                    </div>
                </div>
            </Window>
        )
    }
}

export default Modal;