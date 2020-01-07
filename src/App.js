import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LandingPage from './containers/LandingPage/LandingPage';
import Auth from './containers/Auth/Auth';

function App() {

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route exact path='/' component={LandingPage} />
      <Redirect to='/' />
    </Switch>

  );

  return (
    <Layout> 
        {routes}
    </Layout>
    
  );
}

export default App;
