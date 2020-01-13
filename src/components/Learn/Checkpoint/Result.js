import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CodeIcon from '@material-ui/icons/Code';
import RefreshIcon from '@material-ui/icons/Refresh';

import Button from '../../shared/Button';

const Window = styled.div`
    padding: 20px;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background-color: white;
    // max-width: 80%;
    // margin: 2rem;
    // max-height:80%;
    height: 500px;
    width: 700px;
    position: relative;
`

const CaseEntry = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`

const ButtonWrapper = styled.div`
    bottom: 0;
    right: 0;
    position: absolute;
    margin: 0 10px;
`

const StatusBox = styled.div`
    width: 60px;
    padding: .2rem;
    border-radius: 10px;
    background: ${props => props.pass ? 'rgba(149, 255, 112, 0.5)' : 'rgba(255, 0, 0, 0.15)'};
    color: ${props => props.pass ? '#1c6a00' : '#c70000'};
    font-weight: 600;
    font-size: 12px;
    text-align: center;
`

const CompareBox = styled.div`
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    padding: 10px;
    font-size: 14px;
`

const CodeArea = styled.div`
    color: white;
    background: black;
    border-radius: 6px;
    padding: 10px;
    margin: 5px 0 10px;
    line-height: .5;
`

const CodeCard = styled.div`
    position: relative;
    padding: 1rem;
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    background: white;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
`

const Header = styled.div`;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 10px 0 30px 0;
`

const RefreshWrapper = styled.div`
    text-align: center;
    margin-top: 20px;
`

const Time = styled.div`
    color: grey;
    font-size: 14px;
`

const code_icon_style = {
    margin: '0 3px -5px 0',
}

const submitted_code_style = {
    margin: '0 -1rem 0 -1rem',
    borderRadius: '0',
    minHeight: '300px'
}

// for making UI, replaced by props.result later
const data = {
    "cases": {
        "1": { // testcase 1
            "fail_case": {
                // has data if this test failed, this test passed so this one doesn't
            },
            "pass_cases": [ // lines of code that okpy runs using the source test file
                ">>> from a import *", // okpy needs to import ALL the source's functions before running (so it can test them)
                ">>> from b import *",
                ">>> num_sides(\"triangle\")",
                "3"
            ]
        },
        "2": { // testcase 2
            "fail_case": {
                "expected": "\"triangle\"", // expected output specified in test files
                "actual": "'triangle'"      // actual output okpy runs the source to get this
            },
            "pass_cases": [ // still have data here even though this test failed, will remove this key-val pair in the future
                ">>> from a import *",
                ">>> from b import *"
            ]
        }
    },
    "results": { // summary bc y not
        "num_pass": 1,
        "num_fail": 1
    }
}

const Result = (props) => {
    return (
        <Window>
            <Grid container spacing={2} justify='center'>
                <Grid item sm={6}>
                    <CodeCard>
                        <Header>
                            <div>
                                <CodeIcon fontSize={'small'} style={code_icon_style} />
                                solution.py
                            </div>
                            <Time>2 min ago</Time>
                        </Header>

                        <CodeArea style={submitted_code_style}>
                            <pre>
                                <code>
                                    <p># This program prints Hello World!</p>
                                </code>
                                <code>
                                    <p>print('Hello World!')</p>
                                </code>
                            </pre>
                        </CodeArea>

                        <RefreshWrapper>
                            <RefreshIcon />
                        </RefreshWrapper>
                    </CodeCard>
                </Grid>

                <Grid item sm={6}>
                    <CaseEntry>
                        <strong>Invalid Inputs</strong>
                        <StatusBox pass={1}>Passed</StatusBox>
                    </CaseEntry>
                    <CaseEntry>
                        <strong>Print Statement</strong>
                        <StatusBox pass={0}>Failed</StatusBox>
                    </CaseEntry>
                    <CompareBox>
                        <div>Expected Output:</div>
                        <CodeArea>
                            <pre>
                                <code>
                                    <p># This program prints Hello World!</p>
                                </code>
                                <code>
                                    <p>print('Hello World!')</p>
                                </code>
                            </pre>
                        </CodeArea>
                        <div>Your Output:</div>
                        <CodeArea>
                            <pre>
                                <code>
                                    <p># This program prints Hello World!</p>
                                </code>
                                <code>
                                    <p>print('HellowWorld!')</p>
                                </code>
                            </pre>
                        </CodeArea>
                    </CompareBox>
                    <CaseEntry>
                        <strong>What's Wrong Though ;_;</strong>
                        <StatusBox pass={1}>Passed</StatusBox>
                    </CaseEntry>
                </Grid>
            </Grid>

            <ButtonWrapper>
                <Button buttonState="< Resubmit"
                    class_name="button"
                    click={props.resubmit}
                />
                <Button buttonState="Next >"
                    class_name="button invert"
                    click={props.closeModal} />
            </ButtonWrapper>
        </Window>
    )
}

export default Result;
