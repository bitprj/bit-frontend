import React, { Component } from 'react';
import styled from 'styled-components';
import RichTextToReact from 'rich-text-to-react';

import ReactMarkdown from 'react-markdown';
import CodeBlock from '../shared/CodeBlock';

import Button from '../shared/Button'
import media from '../shared/media'

import { RenderingOptions } from '../../services/RenderingOptions';
import ContentfulService from '../../services/ContentfulService';

const Window = styled.div`
    padding: 0px;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: white;
    max-width: 80%;
    margin: 2rem;
    max-height:80%;
`

const Slide = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width:100%;
    margin-right: auto;
    margin-left: auto;
    padding-left: 0px;
    padding-right: 0px;
`

const ControlSection = styled.div`
    text-align: center;
    margin-bottom: 10px;
    position: relative;
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
    height: '100%',
    width: '100%',
    display: 'block',
}

const ResponsivePanel = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    position: relative;
    padding: 0px;
    width: 50%;
    ${media.tablet`min-width: 80vw;`};
    ${media.phone`min-width: 80vw;`};
`
const ResponsiveAssets = styled.div`
    display: flex;
    background-color: rgb(43, 43, 43);
    flex-flow: column wrap;
    justify-content: flex-start;
    position: relative;
    padding: 0px;
    width: 50%;
    ${media.tablet`min-width: 80vw;`};
    ${media.phone`min-width: 80vw;`};
`
const StyledTextArea = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;
    vertical-align: middle;
    padding: 10px;
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
        this.service.getConcept('1gzvGY8AuGVhyxwAirTDrZ').then(data => {
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
                        <Slide key={`slide-${slide.id} `}>
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

    // give keys to these below
    render() {
        return (
            <Window>
                {this.state.slides.map((slide, index) => {
                    return (
                        (index === this.state.currentSlide) ?
                            <Slide key={`slide-${slide.id}`}>
                                <ResponsivePanel>
                                    <StyledTextArea>
                                        <h3>{slide.title}</h3>
                                        <RichTextToReact key={`concept-${slide.id}`} document={slide.content} options={RenderingOptions} />
                                    </StyledTextArea>
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
                                </ResponsivePanel>

                                <ResponsiveAssets>
                                    {slide.image ?
                                        <img src={slide.image.fields.file.url} style={img_style} alt={slide.image.fields.title} />
                                        : null}
                                    {slide.snippet ?
                                        <ReactMarkdown source={slide.snippet} renderers={{ code: CodeBlock }} />
                                        : null}
                                </ResponsiveAssets>
                            </Slide>
                            : null
                    )
                })}
            </Window>
        )
    }
}

export default Concept;