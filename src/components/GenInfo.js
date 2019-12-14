import React from "react";

const GenInfo = (props) => {
    return (
        <div>
            {props.labTitle}
            <h2>{props.cardTitle}</h2>

            <style jsx>{`
            h2 {
                margin-top: 0;
                margin-bottom: 0;
            }
            `}</style>
        </div>
    )
}

export default GenInfo;
