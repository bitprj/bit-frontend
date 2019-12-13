import React from "react";

class Button extends React.Component {
    hellow() {
        console.log('This is: ', this);
    }

    render() {
        return (
            <div className="button" onClick={(e) => this.hellow(e)}>
                Hellow Button
            <style jsx>{`
                .button {
                    display: inline-block;
                    padding: .25rem .5rem;
                    margin: .2rem;
                    border: solid #0070f3;
                    border-radius: 7px;
                    background-color: #0070f3;
                    color: white;
                    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
                }
                .button:hover {
                    border: solid black;
                    background-color: black;
                }
            `}</style>
            </div>
        )
    }
}

export default Button;