import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

import { connect } from 'react-redux';
import { action } from '../actions/action';

class WithAuthentication extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }

        // might change the paramter later
        this.authService = new AuthService();
    }

    componentDidMount() {
        if (!this.authService.userAuthenticated()) {
            this.props.history.push("/");
        } else {
            // const url = '/getUser/';
            // const token = this.authService.getToken();

            // this dummy call will be changed to the one commented below
            const fakeUser = {
                name: "Moomin",
                type: "student"
            }

            this.setState({ user: fakeUser })

            // this.authService.getUserInfo();
        }
    }

    render() {
        if (this.state.user) {
            return (
                <div>{this.props.children}</div>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        action: () => dispatch(action())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(WithAuthentication));