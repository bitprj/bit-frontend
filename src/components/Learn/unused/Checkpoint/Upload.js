import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import Button from '../../../shared/Button';

import { uploadFiles, processResult } from '../../../../services/LearnService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Window = styled.div`
    padding: 2rem;
    text-align: center;
    height: 50vh;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: white;
    margin: 2rem;
    position: relative;
`

const ButtonWrapper = styled.div`
    bottom: 0;
    position: absolute;
`

class Upload extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
        }
        this.upload = this.upload.bind(this);
    }

    upload = () => {
        uploadFiles(this.state.files)
            .then(rawData => {
                const data = processResult(rawData);
                this.props.fillResult(data);
                this.props.switchToResult();
            })
            .catch(err => {
                alert(err);
            });
    }

    fileUpload = (fileItems) => {
        this.setState({
            files: fileItems
        })
    }

    render() {
        return (
            <Window>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} >
                        <img width='200px' src='https://media1.tenor.com/images/61410e9c5c66ba51358bc498a76d25ad/tenor.gif?itemid=9295601' alt='Upload Icon' />

                        <h2>Checkpoint</h2>
                        <p>Upload solution.py making sure that it satisfies all of the test cases mentioned above.</p>

                        <ButtonWrapper>
                            <Button buttonState="< Cancel" class_name="button" click={this.props.closeModal} />
                        </ButtonWrapper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FilePond
                            ref={ref => (this.pond = ref)}
                            allowMultiple={true}
                            maxFiles={3}
                            onupdatefiles={fileItems => this.fileUpload(fileItems)} />

                        <Button buttonState="Upload" class_name="button invert" click={this.upload} />
                    </Grid>
                </Grid>
            </Window>
        )
    }
}

export default Upload;
