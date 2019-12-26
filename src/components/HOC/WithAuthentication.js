import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import { withRouter } from 'react-router-dom';

class WithAuthentication extends Component {
    constructor() {
        super();
        this.service = new AuthService();
    }

    componentDidMount() {
        if (!this.service.userAuthenticated()) {
            this.props.history.push("/");
        }
    }

    render() {
        if (this.service.userAuthenticated()) {
            return (
                <div>{this.props.children}</div>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }
}

export default withRouter(WithAuthentication);