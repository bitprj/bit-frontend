import React, { Component } from "react";

class Navigation extends Component {
    state = {
        card_names: [
            "What is Python?",
            "Why should we learn Python?",
            "That's it y'all"
        ]
    }

    render() {
        return (<div className="menu-bar" >

            <h1>Hello</h1>
            <style jsx>{`
            .menu-bar {
                margin-right: 10rem;
            }
            `}</style>
        </div >
        )
    }
}

export default Navigation;