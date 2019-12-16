import React, { Component } from 'react';

class Button extends Component {
    state = {
        complete: false
    }

    completeHandler = () => {
        this.setState({
            complete: true
        })
        console.log("click");
    }

    render() {
        return (
            <div className={this.props.class_name} onClick={this.completeHandler}>
                {this.props.name}

                <style jsx>{`
                .button {
                    display: inline-block;
                    cursor: pointer;
                    text-decoration: none;
                    padding: 0.25rem 0.5rem;
                    margin: 0.25rem 0.5rem;
                    border-radius: 7px;
                    color: #0070f3;
                    background-color: transparent;
                    border: none;
                    font-size: inherit;
                    line-height: inherit;
                    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
                
                }
                .button:hover {
                    color: #0070f3;
                    background: rgba(0, 118, 255, 0.1);
                }
                .button.invert {
                    margin: 0;
                    padding: 0 3.5rem;
                    line-height: 2.5rem;
                    border-radius: 7px;
                    background-color: #0070f3;
                    box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
                    color: white;
                  }
                  .button.invert:hover {
                    background: rgba(0, 118, 255, 0.9);
                    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.23);
                  }
                  .button.invert:active {
                    background: #006ae6;
                  }
                `}</style>
            </div>
        )
    }
}

export default Button;