import React, { Component } from 'react';
import styled from 'styled-components';
import RichTextToReact from 'rich-text-to-react';

import { RenderingOptions } from '../../services/RenderingOptions';
import ContentService from '../../services/ContentService';

import Button from '../shared/Button'

const ButtonSection = styled.div`
    text-align: right;
`

class Content extends Component {
    constructor() {
        super();
        this.state = {
            content: {
                fields: {
                    title: '',
                    content: ''
                }
            }
        }

        this.service = new ContentService();
    }

    componentDidMount() {
        this.service.getCardContent(1).then(response => {
            this.setState({
                content: response.items[1]
            })
        })
    }

    render() {
        return (
            <div>
                <RichTextToReact document={this.state.content.fields.content} options={RenderingOptions} />

                <ButtonSection>
                    <Button buttonState="< Prev" class_name="button" click={() => this.props.click(-1)} />
                    <Button buttonState="Next >" class_name="button invert" click={() => this.props.click(1)} />
                </ButtonSection>
            </div>
        )
    }
}



export default Content;
