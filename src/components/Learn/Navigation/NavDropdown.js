import React, { useState } from 'react';

// const arrow_style = {
//     verticalAlign: 'middle',
//     marginRight: 7,
//     display: 'inline-block',
//     lineHeight: 0
// };

const NavDropdown = (props) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className="fixed-navigation-container">
            <div role="button"
                className="current"
                onClick={() => setDropdown(!dropdown)}>

                {props.gemBox}
                {props.labTitle}
                {props.cardTitle}

                {/* <span style={arrow_style}> */}
                {/* <ArrowIcon /> */}
                {/* </span> */}
            </div>

            <div className={`navigation-area dropdown${dropdown ? '' : ' courses-closed'}`}>
                {props.steps}
            </div>

            <style jsx>{`
                .fixed-navigation-container {
                    position: relative;
                    // display: flex;
                    height: 80px;
                    width: 100%;
                    padding: 0 0 1rem 1.5rem;
                    align-items: center;
                    justify-content: space-between;
                }
                .current {
                    // flex: 1;
                    // display: flex;
                    height: 100%;
                    align-items: center;
                    // padding-right: 0.5rem;
                    overflow: hidden;
                    cursor: pointer;
                }
                .navigation-area.dropdown {
                    position: absolute;
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    left: 0;
                    top: 100%;
                    margin-left: -5px;
                    bottom: -42vh;
                    width: 100%;
                    background: #0a192f;
                    border-bottom: 5px solid salmon;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    transition: bottom .5s ease;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                }
                .navigation-area.dropdown.courses-closed {
                    bottom: 100%;
                }
                `}</style>
        </div>
    );
}

export default NavDropdown;
