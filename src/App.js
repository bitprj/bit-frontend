import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";

// import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Student from "./pages/Student";
import Explore from "./pages/Explore";
import Teacher from "./pages/Teacher";
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
            <Route path="/login" component={Login} />
            <Route path="/explore" component={Explore} />

            <WithAuthentication>
              <Route path="/learn" component={Learn} />
              <Route path="/student" component={Student} />
              <Route path="/teacher" component={Teacher} />
              <Route path="/logout" component={Logout} />
            </WithAuthentication>

            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </WithProviders>
  );
};

export default App;
