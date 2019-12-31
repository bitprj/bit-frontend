import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RichTextToReact from 'rich-text-to-react';
import ReactMarkdown from 'react-markdown';

import { RenderingOptions } from '../../services/RenderingOptions';

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
    color: ${props => props.locked ? 'white' : 'black'};
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
            steps: []
        }
        this.unlockHint = this.unlockHint.bind(this);

        this.service = new ContentfulService();
        // this.service = new LearnService();
    }

    componentDidMount() {
        this.service.getHint(this.props.id).then(data => {
            // console.log(data)
            this.setState({
                id: this.props.id,
                title: data.title,
                steps: data.steps
            })
            console.log(this.state.steps);
            // this.state.steps.map(step => { console.log(step.title) })

            // console.log(JSON.stringify(this.state.steps))
        })

        // this.service.getHint(1).then(data => {
        //     this.setState({
        //         id: data.id,
        //         title: data.name,
        //         difficulty: data.difficulty,
        //         gems: data.gems,
        //         content: data.content,
        //         steps: data.steps
        //     })
        // })
    }

    unlockHint = () => {
        this.props.changeTotalGems(this.state.gems);
        // later - API call to unlock card and get its content
        this.setState({
            isLocked: false
        })
    }

    // render() {
    //     return JSON.stringify(this.state.steps);
    // }

    render() {
        const steps = this.state.steps.map((step) => {
            return (
                <div>
                    <RichTextToReact key={`hint-${this.state.id}`} document={step.content} options={RenderingOptions} />
                    {
                        step.image ?
                            <img src={step.image.fields.file.url} alt={step.image.fields.title} />
                            : null
                    }
                    {
                        step.snippet ?
                            <ReactMarkdown source={step.snippet} renderers={{ code: CodeBlock }} />
                            : null
                    }
                </div>
            );
        })

        return (
            <div>
                {
                    this.state.isLocked ?
                        <HintCard locked={this.state.isLocked}>
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
                        :
                        <HintCard locked={this.state.isLocked}>
                            <Grid container spacing={0}>
                                <Grid item xs={8} >
                                    <div>{this.state.title}</div>
                                </Grid>

                                <Grid item xs={4} >
                                    <MoreVertIcon />
                                </Grid>
                            </Grid>
                            {steps}
                        </HintCard>
                }
            </div >
        )
    }
}

export default Hint;