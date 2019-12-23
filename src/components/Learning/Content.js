import React, { lazy, Suspense } from 'react';
import { importMDX } from 'mdx.macro';

import Button from '../shared/Button'

const Markdown = lazy(() => importMDX('../../../markdown.md'));

const Content = (props) => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {/* <p>{props.cardContent}</p> */}
                <Markdown />
                <Button buttonState="< Prev" class_name="button" />
                <Button buttonState="Next >" class_name="button invert" />
            </Suspense>
        </div>
    )
}

export default Content;
