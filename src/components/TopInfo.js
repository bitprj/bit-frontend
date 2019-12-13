import React from "react";

const TopInfo = () => {
    const moduleName = "Intro to Python";
    const labName = "Object-Oriented Programming";

    return (
        <div>
            {moduleName}
            <h2>{labName}</h2>
            <style jsx>{`
            h2 {
                margin-top: 0;
                margin-bottom: 0;
            }
            `}</style>
        </div>
    )
}

export default TopInfo;
