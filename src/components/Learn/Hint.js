import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RichTextToReact from 'rich-text-to-react';
import ReactMarkdown from 'react-markdown';

import { RenderingOptions } from '../../services/RenderingOptions';

import Button from '../shared/Button';
import CodeBlock from '../shared/CodeBlock';
import HintModal from './HintModal';

// import LearnService from '../../services/LearnService';
import ContentfulService from '../../services/ContentfulService';

const HintCard = styled.div`
    position: relative;
    padding: .65rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    margin-bottom: .5rem;
    background-color: ${props => props.locked ? '#000033' : 'white'};
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    color: ${props => props.locked ? 'white' : 'black'};
    display: ${props => props.display ? 'block' : 'none'};
`

const ExpandWrapper = styled.div`
    text-align: right;
`

class Hint extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            title: '',
            difficulty: '',
            gems: -50, // get from API call
            isLocked: true,
            parent: null,
            steps: [],
            isExpanded: false,
            currentStep: 0
        }
        this.unlockHint = this.unlockHint.bind(this);
        this.expandHint = this.expandHint.bind(this);
        this.shrinkHint = this.shrinkHint.bind(this);
        this.showNextStep = this.showNextStep.bind(this);

        this.service = new ContentfulService();
        // this.service = new LearnService();
    }

    componentDidMount() {
        this.service.getHint(this.props.id).then(data => {
            console.log(data);

            this.setState({
                id: this.props.id,
                title: data.title,
                // isLocked: data.isLocked,
                steps: data.steps
            })
        })
    }

    unlockHint = () => {
        this.props.changeTotalGems(this.state.gems);
        // later - API call to unlock card and get its content
        this.setState({
            isLocked: false
        })
    }

    expandHint = () => {
        this.props.expandHint(this.state.id);
        this.setState({
            isExpanded: true
        })
    }

    shrinkHint = () => {
        this.props.shrinkHint(this.state.id);
        this.setState({
            isExpanded: false
        })
    }

    showNextStep = (index) => {
        const newSteps = [...this.state.steps];
        newSteps[index + 1].isShown = true;
        this.setState({
            steps: newSteps,
            currentStep: index + 1
        })
    }

    render() {
        const steps = this.state.steps.map((step, index) => {
            // const renderedStep = JSON.stringify(step.isShown && this.state.isExpanded)
            const renderedStep = (step.isShown && this.state.isExpanded) ?
                <div>
                    <HintCard key={`step-${step.title}`} display={step.isShown}>
                        <h3>{step.heading}</h3>
                        <RichTextToReact key={`hint-${this.state.id}`}
                            document={step.content}
                            options={RenderingOptions} />

                        {step.image ?
                            <img src={step.image.fields.file.url}
                                alt={step.image.fields.title} />
                            : null}
                        {step.snippet ?
                            <ReactMarkdown source={step.snippet}
                                renderers={{ code: CodeBlock }} />
                            : null}
                    </HintCard>

                    <ExpandWrapper>
                        {(index < this.state.steps.length - 1 && index === this.state.currentStep) ?
                            <Button buttonState="NextHint"
                                class_name="button invert"
                                index={index}
                                click={this.showNextStep} />
                            : null}

                        {(index === this.state.steps.length - 1) ?
                            <Button buttonState="<"
                                class_name="button invert"
                                click={this.shrinkHint} />
                            : null}
                    </ExpandWrapper>
                </div>
                : null;
            return renderedStep;
        })

        return (
            <div>
                {this.state.isLocked ?
                    <HintCard locked={this.state.isLocked} display={this.props.display}>
                        <Grid container spacing={0}>
                            <Grid item xs={8} >
                                <div>{this.state.title}</div>
                            </Grid>

                            <Grid item xs={4} >
                                <HintModal
                                    hintID={this.state.id}
                                    gems={this.state.gems}
                                    unlockHint={this.unlockHint} />
                            </Grid>
                        </Grid>

                    </HintCard>
                    : (<div>
                        <HintCard locked={this.state.isLocked} display={this.props.display}>
                            <Grid container spacing={0}>
                                <Grid item xs={8} >
                                    <div>{this.state.title}</div>
                                </Grid>

                                <Grid item xs={4} >
                                    <ExpandWrapper>
                                        <MoreVertIcon onClick={this.expandHint} />
                                        {/* {this.state.isExpanded ?
                                            <button onClick={this.shrinkHint}>back</button>
                                            : <button onClick={this.expandHint}>go</button>} */}
                                    </ExpandWrapper>
                                </Grid>
                            </Grid>
                        </HintCard>
                        {steps}
                    </div>)}
            </div >
        )
    }
}

export default Hint;