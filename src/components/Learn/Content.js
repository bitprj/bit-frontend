import React, { Component } from 'react';
import styled from 'styled-components';
import RichTextToReact from 'rich-text-to-react';

import { RenderingOptions } from '../../services/RenderingOptions';
import ContentfulService from '../../services/ContentfulService';

import Button from '../shared/Button'

// import Concept from './Concept';
import ConceptModal from './ConceptModal';

const ButtonSection = styled.div`
    text-align: right;
`

class Content extends Component {
    constructor() {
        super();
        this.state = {
            content: {}
        }

        this.service = new ContentfulService();
    }

    componentDidMount() {
        this.service.getCardContent('5PKQgXzL92klwCqFkjdgSO').then(response => {
            this.setState({
                content: response.content
            })
        })
    }

    render() {
        return (
            <div>
                <RichTextToReact document={this.state.content} options={RenderingOptions} />

                <ButtonSection>
                    <Button buttonState="< Prev" class_name="button" click={() => this.props.click(-1)} />
                    <Button buttonState="Next >" class_name="button invert" click={() => this.props.click(1)} />
                </ButtonSection>
                <ConceptModal />
            </div>
        )
    }
}



export default Content;
