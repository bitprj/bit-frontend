import React from "react";

const NavBar = (props) => (
    <nav>
        <div>
            {props.labTitle}
            <h2>{props.cardTitle}</h2>
        </div>

        <div>
            <p>{props.totalGems} <span role="img" aria-label="Total Gems">💎</span></p>
        </div>

        <style jsx>{`
            nav {
                height: 60px;
                padding: 10px;
                margin: -8px;
                box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
                align-items: center;
                flex-wrap: wrap;
                display: flex;
                justify-content: space-between;
                flex: 1;
                position: relative;
            }

            h2 {
                margin-top: 0;
                margin-bottom: 0;
            }
        `}</style>
    </nav>
)

export default NavBar;
