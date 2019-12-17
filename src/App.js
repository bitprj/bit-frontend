import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import Learning from './pages/Learning';
import Submit from './pages/Submit';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Learning} />
                <Route path="/submit" component={Submit} />
                {/* <Link to="submit" */}
            </Switch>
        </Layout>
    )
}

export default App;
