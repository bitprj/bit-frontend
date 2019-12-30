import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import RichTextToReact from 'rich-text-to-react';

import ReactMarkdown from 'react-markdown';
import CodeBlock from '../shared/CodeBlock';

import Button from '../shared/Button'

import { RenderingOptions } from '../../services/RenderingOptions';
import ContentfulService from '../../services/ContentfulService';

const Window = styled.div`
    padding: .5rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: white;
    max-width: 80%;
    max-height: 80%;
    margin: 2rem;
`

const Slide = styled.div`
`

const ControlSection = styled.div`
    text-align: center;
    margin-bottom: 10px
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

const img_style = {
    // maxWidth: '90%',
    // maxHeight: '500px',
    height: '100%',
    width: '100%',
    display: 'block',
    float: 'right',
    margin: '-.5rem',
}


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
                                <Grid container spacing={0}>
                                    <Grid item xs={6}>
                                        <h3>{slide.title}</h3>
                                        <RichTextToReact document={slide.content} options={RenderingOptions} />

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
                                    </Grid>

                                    <Grid item xs={6}>
                                        {slide.image ?
                                            <img src={slide.image.fields.file.url} style={img_style} />
                                            : null}
                                        {slide.snippet ?
                                            // <div>{JSON.stringify(slide.snippet)}</div>
                                            <ReactMarkdown source={slide.snippet} renderers={{ code: CodeBlock }} />
                                            : null}
                                    </Grid>
                                </Grid>
                            </Slide>
                            : null
                    )
                })}
            </Window>
        )
    }
}

export default Concept;