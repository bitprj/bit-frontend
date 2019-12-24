import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Learn from './pages/Learn';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Student from './pages/Student';

import WithAuthentication from './components/HOC/WithAuthentication';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact
                            render={(props) => <Login {...props} userLogin={this.userLoginHandler} />} />

                        <WithAuthentication userLogin={this.userLoginHandler}>
                            <Route path="/learn" exact component={Learn} />
                            <Route path="/student" exact component={Student} />
                            <Route path="/logout" exact component={Logout} />
                        </WithAuthentication>
                    </Switch>
                </Layout>
            </BrowserRouter>
        )
    }
}

export default App;
