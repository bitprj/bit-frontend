import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';

// import Home from "./pages/Home";
import Learn from './pages/Learn';
import NewLearn from './pages/NewLearn';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Student from './pages/Student';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';

import WithProviders from './components/HOC/WithProviders';
import { GlobalStyle, GlobalStyleReset } from './assets/styles/GlobalStyles'

const App = props => {
  return (
    <WithProviders>
      <GlobalStyleReset />
      <GlobalStyle />

      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Student} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/new-learn" exact component={NewLearn} />
            <Route path="/learn" exact component={Learn} />

            <Route path="/login" exact component={Login} />

            <Route path="/logout" exact component={Logout} />
            {/* <WithAuthentication> */}
            {/* </WithAuthentication> */}

            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </WithProviders>
  );
};

export default App;
