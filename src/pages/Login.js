import React, { Component, Fragment } from 'react';

import AuthService from '../services/AuthService';

import { connect } from 'react-redux';
import { login } from '../redux/account/actions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.authService = new AuthService();
    }

    componentDidMount() {
        if (this.authService.userAuthenticated()) {
            this.props.history.push('/');
        }
    }

    inputChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async formSubmitHandler(e) {
        e.preventDefault();

        try {
            await this.authService.login(this.state.email, this.state.password);
            if (this.authService.userAuthenticated) {
                this.props.login();
                this.props.history.push('/student');
            }
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        return (
            <Fragment>
                <h1>Login</h1>
                <form onSubmit={this.formSubmitHandler}>
                    <input
                        className="form-item"
                        placeholder="Email goes here..."
                        name="email"
                        type="text"
                        onChange={this.inputChangeHandler}
                    />
                    <input
                        className="form-item"
                        placeholder="Password goes here..."
                        name="password"
                        type="password"
                        onChange={this.inputChangeHandler}
                    />
                    <input
                        className="form-submit"
                        value="SUBMIT"
                        type="submit"
                    />
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(login())
    }
}

export default connect(null, mapDispatchToProps)(Login);
