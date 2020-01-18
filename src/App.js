import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";

// import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Student from "./pages/Student";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";

import WithAuthentication from "./components/HOC/WithAuthentication";
import WithProviders from "./components/HOC/WithProviders";

const App = props => {
  return (
    <WithProviders>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Student} />
            <Route path="/login" exact component={Login} />
            <Route path="/explore" exact component={Explore} />

            <WithAuthentication>
              <Route path="/learn" exact component={Learn} />
              <Route path="/student" exact component={Student} />
              <Route path="/logout" exact component={Logout} />
            </WithAuthentication>

            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </WithProviders>
  );
};

export default App;
