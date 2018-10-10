import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthtoken';
import { setCurrentUser, logoutUser } from './actions/authActions';
// import { clearCurrentProfile } from "./actions/profileActions";

// redux
import { Provider } from "react-redux";
import store from "./store";

// components
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// import styles
import './styles/App.css';

// check for Token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header></Header>
            <main role="main" className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/Login" component={Login} />
            </main>
            <Footer></Footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
