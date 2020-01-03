import React from 'react';

import CheckIcon from '../../assets/icons/check'
import CircleIcon from '../../assets/icons/circle'
import LockIcon from '../../assets/icons/lock'

/**
 * Helper Class to choose Status Icon appropriately
 * @param {status} props 
 */
const StatusIcon = props => {
    const { type, width, height } = props;
    switch (type) {
        case 'complete':
            return <CheckIcon color="#2BDB66" check_width={width || "2.25rem"} check_height={height} />

        case 'incomplete':
            return <CircleIcon color="#FF5454" width={width || "2.25rem"} height={height} />

        case 'locked':
            return <LockIcon color="#FFE554" width={width || "2.25rem"} height={height} />

        default:
            return null
    }
}

export default StatusIcon;
