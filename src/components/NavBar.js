import React from "react";
import TopInfo from "./TopInfo"

const NavBar = () => (
    <nav>
        <TopInfo />
        <style jsx>{`
            nav {
                height: 60px;
                padding: 10px;
                box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
            }
            nav .top-info {
                vertical-align: middle;
            }
        `}</style>
    </nav>
)

export default NavBar;