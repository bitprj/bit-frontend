import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

// import Learning from './pages/Learning';
// import Submit from './pages/Submit';
import Student from './pages/Student';

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    {/* <Route path="/" exact component={Learning} /> */}
                    {/* <Route path="/submit" component={Submit} /> */}
                    <Route path="/" component={Student} />
                    {/* <Link to="submit" */}
                </Switch>
            </Layout>
        )
    }
}

export default App;
