import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LandingPage from './containers/LandingPage/LandingPage';
import Login from './containers/Auth/Login/Login';
import SingUp from './containers/Auth/SignUp/SignUp';


function App() {

  let routes = (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SingUp} />
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
