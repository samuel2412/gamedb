import React,{useEffect} from 'react';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import LandingPage from './containers/LandingPage/LandingPage';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index';

const App = props =>{
  const { onAutoTryLogin } = props;
  useEffect(()=>{
    onAutoTryLogin();
  },[onAutoTryLogin]);
  
  let routes = (
    <Switch>
      <Route path='/authentication' component={Auth} />
      <Route path='/logout' component={Logout} />
      <Route exact path="/" component={ LandingPage } />
      <Redirect to='/' />
    </Switch>

  );

  return (
    <Layout> 
        {routes}
    </Layout>
    
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.tokenId !== null
  }

}
const mapDispatchToProps = dispatch => {
  return {
    onAutoTryLogin: () =>
      dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
