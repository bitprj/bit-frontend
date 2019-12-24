import React, { lazy, Suspense } from 'react';
import { importMDX } from 'mdx.macro';
import styled from 'styled-components';

import Button from '../shared/Button'

const Markdown = lazy(() => importMDX('../../../markdown.md'));

const ButtonSection = styled.div`
    text-align: right;
`

const Content = (props) => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {/* <p>{props.cardContent}</p> */}
                <Markdown />

                <ButtonSection>
                    <Button buttonState="< Prev" class_name="button" click={() => props.click(-1)} />
                    <Button buttonState="Next >" class_name="button invert" click={() => props.click(1)} />
                </ButtonSection>
            </Suspense>
        </div>
    )
}

export default Content;
