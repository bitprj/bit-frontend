import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

import AuthService from '../services/AuthService';

import { connect } from 'react-redux';
import { login } from '../redux/actions/actions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
        }

        this.changeInput = this.changeInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.authService = new AuthService();
    }

    componentDidMount() {
        if (this.authService.userAuthenticated()) {
            this.props.history.push('/');
        }
    }

    changeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async submitForm(e) {
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
                <form onSubmit={this.submitForm}>
                    <TextField id="standard-basic"
                        label="Email"
                        name="email"
                        onChange={this.changeInput} />
                    <TextField id="standard-basic"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={this.changeInput} />
                    <input
                        value="SUBMIT"
                        type="submit" />
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
