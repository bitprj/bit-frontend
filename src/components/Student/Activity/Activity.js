import React from 'react';
import HelpCard from '../../../components/shared/high/HelpCard';
import ActionCard from '../../../components/shared/high/ActionCard';

const Activity = (props) => {

    return (
        <>
        <HelpCard type='issue' />
        <HelpCard type='feedback' />
        <ActionCard type='resume'/>
        <ActionCard type='start' />
        </>
    )
}

export default Activity;
