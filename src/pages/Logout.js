import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../redux/actions/action';

import AuthService from '../services/AuthService';

class Logout extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.authService.logout();
        this.props.logout();
    }

    render() {
        return (<Redirect to="/" />);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);