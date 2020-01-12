import React from 'react';
import styled from 'styled-components';

const HintCard = styled.div`
    position: relative;
    padding: '1.5rem';
    border-radius: 7px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    margin-bottom: .5rem;
    background-color: white;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
`

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
        <HintCard>
            wee
        </HintCard>
    )
}

export default Result;
