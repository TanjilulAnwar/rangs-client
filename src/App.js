import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import SignInOutContainer from './containers';
import Home from './containers/Home';
import {UserProvider, useUserState} from './context/UserContext';


const PrivateRoute = ({ component, ...rest })=>{
  var { isAuthenticated } = useUserState();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated
          ? ( React.createElement(component, props) )
          : ( <Redirect to={{pathname: "/auth", state: {from: props.location}}}/> )
      }
    />
  );
}


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/auth" component={SignInOutContainer}/>
            <PrivateRoute path="/" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
