import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Learning from './pages/Learning';
import Login from './pages/Login';
import Submit from './pages/Submit';
import Student from './pages/Student';

import AuthService from './services/AuthService';
import Authentication from './HOC/Authentication';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userType: "visitor"
        }
        this.userLoginHandler = this.userLoginHandler.bind(this);
        this.userLogoutHandler = this.userLogoutHandler.bind(this);
        this.authService = new AuthService();
    }

    userLoginHandler() {
        this.setState({
            userType: "student"
        })
    }

    userLogoutHandler() {
        alert('clickd');
        this.authService.removeToken();
        this.props.history.replace('/');
    }

    render() {
        return (
            <Layout userType={this.state.userType} userLogout={this.userLogoutHandler}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact
                        render={(props) => <Login {...props} userLogin={this.userLoginHandler} />} />

                    <Authentication userLogin={this.userLoginHandler}>
                        <Route path="/learn" exact component={Learning} />
                        <Route path="/submit" exact component={Submit} />
                        <Route path="/student" exact component={Student} />
                    </Authentication>
                </Switch>
            </Layout>
        )
    }
}

export default App;
